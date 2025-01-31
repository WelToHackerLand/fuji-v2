import { defaultAbiCoder } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider, WebSocketProvider } from '@ethersproject/providers';
import { keccak256 } from '@ethersproject/solidity';
import { IMulticallProvider } from '@hovoh/ethcall';
import { TypedDataDomain, TypedDataField, utils } from 'ethers';
import { Observable } from 'rxjs';
import invariant from 'tiny-invariant';

import { CHAIN, CONNEXT_ROUTER_ADDRESS } from '../constants';
import { ChainId, RouterAction } from '../enums';
import {
  ChainConfig,
  ChainConnectionDetails,
  LendingProviderDetails,
  PermitParams,
} from '../types';
import {
  BorrowingVault as BorrowingVaultContract,
  BorrowingVault__factory,
  ILendingProvider__factory,
} from '../types/contracts';
import { BorrowingVaultMulticall } from '../types/contracts/src/vaults/borrowing/BorrowingVault';
import { Address } from './Address';
import { Chain } from './Chain';
import { StreamManager } from './StreamManager';
import { Token } from './Token';

type AccountBalances = {
  deposit: BigNumber;
  borrow: BigNumber;
};

/**
 * The BorrowingVault class encapsulates the end-user logic of interation with the
 * BorrowingVault cotract without the need to deal directly with ethers.js (ABIs, providers etc).
 *
 * It contains read-only functions and leaves to the client only the final step of a blockchain write.
 * The class aims to expose functions that together with user's inputs go throughout the most common
 * path of interacting with a BorrowingVault contract.
 */

export class BorrowingVault extends StreamManager {
  /**
   * The chain ID on which this vault resides
   */
  readonly chainId: ChainId;

  /**
   * The chain on which this vault resides
   */
  readonly chain: Chain;

  /**
   * The address of the vault contract, wrapped in {@link Address}
   * @readonly
   */
  readonly address: Address;

  /**
   * Represents the token, accepted by the vault as collateral that
   * can be pledged to take out a loan
   * @readonly
   */
  readonly collateral: Token;

  /**
   * Represents the token, in which a loan can be taken out
   * @readonly
   */
  readonly debt: Token;

  /**
   * Name of the vault, assigned at deployment
   */
  private name: string;

  /**
   * Address of the lending provider from which the vault is currently sourcing liquidity.
   */
  activeProvider?: string;

  /**
   * Addresses of the lending provider from which the vault can source liquidity.
   */
  allProviders?: string[];

  /**
   * A factor that defines the maximum Loan-To-Value a user can take.
   *
   * @remarks
   * A factor refers to a fixed-digit decimal number. Specifically,
   * a decimal number scaled by 1e18. These numbers should be treated as real
   * numbers scaled down by 1e18. For example, the number 50% would be
   * represented as 5*1e17.
   */
  maxLtv?: BigNumber;

  /**
   * A factor that defines the Loan-To-Value at which a user can be liquidated.
   *
   * @remarks
   * A factor refers to a fixed-digit decimal number. Specifically,
   * a decimal number scaled by 1e18. These numbers should be treated as real
   * numbers scaled down by 1e18. For example, the number 50% would be
   * represented as 5*1e17.
   */
  liqRatio?: BigNumber;

  /**
   * Instance of ethers Contract class, already initialized with
   * address and rpc provider. It can be used to directly call the
   * methods available on the smart contract.
   *
   * @example
   * ```ts
   * await vault.balanceOf(address);
   * ```
   * Use with caution, espesially for writes.
   */
  contract?: BorrowingVaultContract;

  /**
   * Extended instance of contract used when there is a
   * possibility to perform a multicall read on the smart contract.
   * @remarks
   * A multicall read refers to a batch read done in a single call.
   */
  multicallContract?: BorrowingVaultMulticall;

  /**
   * The RPC provider for the specific chain
   */
  rpcProvider?: JsonRpcProvider;

  /**
   * The RPC provider for the specific chain
   */
  wssProvider?: WebSocketProvider;

  /**
   * The multicall RPC provider for the specific chain
   */
  multicallRpcProvider?: IMulticallProvider;

  constructor(address: Address, collateral: Token, debt: Token) {
    invariant(debt.chainId === collateral.chainId, 'Chain mismatch!');

    super();

    this.name = '';
    this.address = address;
    this.collateral = collateral;
    this.chainId = collateral.chainId;
    this.chain = CHAIN[this.chainId];
    this.debt = debt;
  }

  /**
   * Creates a connection by setting an rpc provider.
   *
   * @param configParams - {@link ChainConfig} object with infura and alchemy ids
   */
  setConnection(configParams: ChainConfig): BorrowingVault {
    if (this.rpcProvider) return this;

    const connection = CHAIN[this.chainId].setConnection(configParams)
      .connection as ChainConnectionDetails;

    this.rpcProvider = connection.rpcProvider;
    this.wssProvider = connection.wssProvider;
    this.multicallRpcProvider = connection.multicallRpcProvider;

    this.contract = BorrowingVault__factory.connect(
      this.address.value,
      this.rpcProvider
    );
    this.multicallContract = BorrowingVault__factory.multicall(
      this.address.value
    );

    return this;
  }

  /**
   * Loads and sets name, maxLtv, liqRatio, activeProvider and allProviders.
   *
   * @throws if {@link setConnection} was not called beforehand
   */
  async preLoad() {
    invariant(
      this.multicallContract && this.multicallRpcProvider,
      'Connection not set!'
    );
    // skip when data was already loaded
    if (
      this.maxLtv &&
      this.liqRatio &&
      this.name !== '' &&
      this.activeProvider &&
      this.allProviders
    )
      return;

    const [maxLtv, liqRatio, name, activeProvider, allProviders] =
      await this.multicallRpcProvider.all([
        this.multicallContract.maxLtv(),
        this.multicallContract.liqRatio(),
        this.multicallContract.name(),
        this.multicallContract.activeProvider(),
        this.multicallContract.getProviders(),
      ]);

    this.maxLtv = maxLtv;
    this.liqRatio = liqRatio;
    this.name = name;
    this.activeProvider = activeProvider;
    this.allProviders = allProviders;
  }

  /**
   * Retruns the borrow interest rate by querying the activeProvider.
   *
   * @throws if {@link setConnection} was not called beforehand
   */
  async getBorrowRate(): Promise<BigNumber> {
    invariant(this.contract && this.rpcProvider, 'Connection not set!');

    const activeProvider: string =
      this.activeProvider ?? (await this.contract.activeProvider());
    const borrowRate: BigNumber = await ILendingProvider__factory.connect(
      activeProvider,
      this.rpcProvider
    ).getBorrowRateFor(this.address.value);

    return borrowRate;
  }

  /**
   * Retruns the list with all providers of the vault, marking the active one.
   * Each element also includes the borrow and deposit rate.
   *
   * @throws if {@link setConnection} was not called beforehand
   */
  async getProviders(): Promise<LendingProviderDetails[]> {
    invariant(
      this.contract && this.multicallRpcProvider,
      'Connection not set!'
    );
    if (!this.activeProvider || !this.allProviders) {
      await this.preLoad();
    }

    invariant(this.allProviders, 'Providers are not loaded yet!');

    const depositCalls = this.allProviders.map((addr) =>
      ILendingProvider__factory.multicall(addr).getDepositRateFor(
        this.address.value
      )
    );
    const borrowCalls = this.allProviders.map((addr) =>
      ILendingProvider__factory.multicall(addr).getBorrowRateFor(
        this.address.value
      )
    );
    const nameCalls = this.allProviders.map((addr) =>
      ILendingProvider__factory.multicall(addr).providerName()
    );

    // do a common call for both types and use an index to split them below
    const rates: BigNumber[] = await this.multicallRpcProvider.all([
      ...depositCalls,
      ...borrowCalls,
    ]);

    // TODO: use LENDING_PROVIDERS_LIST when ready instead of fetching name
    const names: string[] = await this.multicallRpcProvider.all(nameCalls);

    const splitIndex = rates.length / 2;
    return this.allProviders.map((addr: string, i: number) => ({
      name: names[i].split('_').join(' '),
      depositRate: rates[i],
      borrowRate: rates[i + splitIndex],
      active: addr === this.activeProvider,
    }));
  }

  /**
   * Returns deposit and borrow balances for an account.
   *
   * @param account - user address, wrapped in {@link Address}
   * @throws if {@link setConnection} was not called beforehand
   */
  async getBalances(account: Address): Promise<AccountBalances> {
    invariant(
      this.multicallContract && this.multicallRpcProvider,
      'Connection not set!'
    );
    const [deposit, borrow] = await this.multicallRpcProvider.all([
      this.multicallContract.balanceOfAsset(account.value),
      this.multicallContract.balanceOfDebt(account.value),
    ]);

    return { deposit, borrow };
  }

  /**
   * Returns a stream of deposit and borrow balances for an account.
   *
   * @param account - user address, wrapped in {@link Address}
   * @throws if {@link setConnection} was not called beforehand
   */
  getBalancesStream(account: Address): Observable<AccountBalances> {
    invariant(this.contract && this.wssProvider, 'Connection not set!');
    const filters = [
      this.contract.filters.Deposit(null, account.value),
      this.contract.filters.Payback(null, account.value),
      this.contract.filters.Borrow(null, null, account.value),
      this.contract.filters.Withdraw(null, null, account.value),
    ];

    return this.streamFrom<Address, AccountBalances>(
      this.wssProvider,
      this.getBalances,
      [account],
      account,
      filters
    );
  }

  /**
   * Returns the digest to be signed by user's injected rpcProvider/wallet.
   *
   * @remarks
   * After the user signs, the next step is to obtain the txData and
   * the address of the router from "this.getTxDetails" which on its turn is
   * to be used in ethers.sendTransaction.
   *
   * @param params - the permit action that needs to be signed
   */
  async signPermitFor(params: PermitParams): Promise<{
    digest: string;
    domain: TypedDataDomain;
    types: Record<string, TypedDataField[]>;
    value: Record<string, string>;
  }> {
    invariant(this.contract, 'Connection not set!');
    const { owner } = params;

    if (this.name === '') {
      await this.preLoad();
    }

    const nonce: BigNumber = await this.contract.nonces(owner.value);

    const { domain, types, value } = this._getPermitDigest(params, nonce);
    const digest = utils._TypedDataEncoder.hash(domain, types, value);

    return { digest, domain, types, value };
  }

  private _getPermitDigest(params: PermitParams, nonce: BigNumber) {
    const { action, owner, receiver, amount, deadline } = params;

    const salt = keccak256(
      ['bytes'],
      [defaultAbiCoder.encode(['uint256'], [this.chainId])]
    );
    const domain: TypedDataDomain = {
      name: this.name,
      version: '1',
      verifyingContract: this.address.value,
      salt,
    };

    const permitType =
      action === RouterAction.PERMIT_BORROW ? 'PermitBorrow' : 'PermitWithdraw';
    const types: Record<string, TypedDataField[]> = {
      [permitType]: [
        { name: 'destChainId', type: 'uint256' },
        { name: 'owner', type: 'address' },
        { name: 'operator', type: 'address' },
        { name: 'receiver', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    };

    const value: Record<string, string> = {
      destChainId: this.chainId.toString(),
      owner: owner.value,
      operator: CONNEXT_ROUTER_ADDRESS[this.chainId].value,
      receiver: receiver.value,
      amount: amount.toString(),
      nonce: nonce.toString(),
      deadline: deadline?.toString() ?? '',
    };

    return { domain, types, value };
  }
}
