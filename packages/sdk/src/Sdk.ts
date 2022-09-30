import { BigNumber } from '@ethersproject/bignumber';

import {
  COLLATERAL_LIST,
  CONNEXT_ADDRESS,
  DEBT_LIST,
  VAULT_LIST,
} from './constants';
import { Address, Currency, Token } from './entities';
import { BorrowingVault } from './entities/BorrowingVault';
import { ChainId } from './enums';
import { ConfigParams } from './types';

export class Sdk {
  /**
   * ConfigParams object containing Infura and Alchemy ids that
   * are used to create JsonRpcProviders.
   */
  private _configParams: ConfigParams;

  constructor(config: ConfigParams) {
    this._configParams = config;
  }

  /**
   * Retruns tokens that can be used as collateral on a specific chain.
   * Sets the connection of each token instance so that they are ready
   * to be used.
   *
   * @param chainId - ID of the chain
   */
  getCollateralForChain(chainId: ChainId): Token[] {
    return COLLATERAL_LIST[chainId].map((token: Token) =>
      token.setConnection(this._configParams)
    );
  }

  /**
   * Retruns tokens that can be borrowed on a specific chain.
   * Sets the connection of each token instance so that they are ready
   *
   * to be used.
   * @param chainId - ID of the chain
   */
  getDebtForChain(chainId: ChainId): Token[] {
    return DEBT_LIST[chainId].map((token: Token) =>
      token.setConnection(this._configParams)
    );
  }

  /**
   * Retruns the balance of account for a given currency,
   * both for native and token.
   *
   * @param currency - instance of {@link Currency}
   * @param account - user address, wrapped in {@link Address}
   */
  async getBalanceFor(
    currency: Currency,
    account: Address
  ): Promise<BigNumber> {
    return currency.setConnection(this._configParams).balanceOf(account);
  }

  /**
   * Retruns the allowance that an account has given to a router
   * for a given currency. If currency is native, it returns MaxUint256.
   *
   * @param currency - instance of {@link Currency}
   * @param account - user address, wrapped in {@link Address}
   */
  async getAllowanceFor(
    currency: Currency,
    account: Address
  ): Promise<BigNumber> {
    const router: Address = CONNEXT_ADDRESS[currency.chainId];
    return currency
      .setConnection(this._configParams)
      .allowance(account, router);
  }

  /**
   * Retruns a default vault for a given combination of tokens and chains
   * and sets a connection.
   *
   * @remarks
   * The Vault gets selected after checks of the lowest borrow rate for the debt token.
   * If such a vault is found only on one of the chains, it returns without
   * checks of the rate. If there is no such vault found on any of the chains,
   * it returns `undefined`.
   *
   * @param collateral - collateral instance of {@link Token}
   * @param debt - debt instance of {@link Token}
   */
  async getBorrowingVaultFor(
    collateral: Token,
    debt: Token
  ): Promise<BorrowingVault | undefined> {
    // both tokens are from the same chain
    if (collateral.chainId === debt.chainId) {
      return this._findVaultByTokenAddr(
        collateral.chainId,
        collateral,
        debt
      )?.setConnection(this._configParams);
    }

    // tokens are on different chains
    const vaultA = this._findVaultByTokenSymbol(
      collateral.chainId,
      collateral,
      debt
    )?.setConnection(this._configParams);
    const vaultB = this._findVaultByTokenSymbol(
      debt.chainId,
      collateral,
      debt
    )?.setConnection(this._configParams);

    // if one of the vaults doens't exist, return the other one
    if (!vaultA || !vaultB) return vaultA ?? vaultB;

    const [rateA, rateB] = await Promise.all([
      vaultA.getBorrowRate(),
      vaultB.getBorrowRate(),
    ]);

    return rateA.lt(rateB) ? vaultA : vaultB;
  }

  private _findVaultByTokenSymbol(
    chainId: ChainId,
    collateral: Token,
    debt: Token
  ): BorrowingVault | undefined {
    const collateralSym: string = collateral.symbol;
    const debtSym: string = debt.symbol;

    return VAULT_LIST[chainId].find(
      (v: BorrowingVault) =>
        v.collateral.symbol === collateralSym && v.debt.symbol === debtSym
    );
  }

  private _findVaultByTokenAddr(
    chainId: ChainId,
    collateral: Token,
    debt: Token
  ): BorrowingVault | undefined {
    const collateralAddr: Address = collateral.address;
    const debtAddr: Address = debt.address;

    return VAULT_LIST[chainId].find(
      (v: BorrowingVault) =>
        v.collateral.address.equals(collateralAddr) &&
        v.debt.address.equals(debtAddr)
    );
  }
}