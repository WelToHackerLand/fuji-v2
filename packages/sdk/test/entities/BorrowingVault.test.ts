import 'dotenv/config';

import { AddressZero } from '@ethersproject/constants';
import { parseUnits } from '@ethersproject/units';
import { BigNumber, utils, Wallet } from 'ethers';

import { USDC, WNATIVE } from '../../src/constants';
import { Address, BorrowingVault } from '../../src/entities';
import { ChainId, RouterAction } from '../../src/enums';
import {
  BorrowParams,
  ChainConfig,
  DepositParams,
  PermitParams,
  RouterActionParams,
} from '../../src/types';

const config: ChainConfig = {
  infuraId: process.env.INFURA_ID ?? '',
  alchemy: {
    420: process.env.ALCHEMY_ID_CHAIN_420,
  },
};

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? '';

describe('BorrowingVault', () => {
  const ADDRESS_ONE = Address.from(
    '0x0000000000000000000000000000000000000001'
  );
  const ADDRESS_TWO = Address.from(
    '0x0000000000000000000000000000000000000002'
  );

  const depositActionParams: DepositParams = {
    action: RouterAction.DEPOSIT,
    vault: Address.from(AddressZero),
    amount: BigNumber.from(1),
    sender: Address.from(AddressZero),
    receiver: Address.from(AddressZero),
  };

  const borrowActionParams: BorrowParams = {
    action: RouterAction.BORROW,
    vault: Address.from(AddressZero),
    amount: BigNumber.from(1),
    receiver: Address.from(AddressZero),
    owner: Address.from(AddressZero),
  };

  const borrowPermitActionParams: PermitParams = {
    action: RouterAction.PERMIT_BORROW,
    vault: Address.from(AddressZero),
    amount: BigNumber.from(1),
    spender: Address.from(AddressZero),
    owner: Address.from(AddressZero),
  };

  const withdrawPermitActionParams: PermitParams = {
    action: RouterAction.PERMIT_BORROW,
    vault: Address.from(AddressZero),
    amount: BigNumber.from(1),
    spender: Address.from(AddressZero),
    owner: Address.from(AddressZero),
  };

  describe('#getProviders', () => {
    it('fetches providers and borrowRate', async () => {
      const vault = new BorrowingVault(
        Address.from('0xfF4606Aa93e576E61b473f4B11D3e32BB9ec63BB'),
        WNATIVE[ChainId.GOERLI],
        USDC[ChainId.GOERLI]
      ).setConnection(config);

      const providers = await vault.getProviders();
      expect(providers).toBeTruthy();
    });
  });

  describe('#signPermitFor', () => {
    it('signs a separate borrow permit', async () => {
      const params: PermitParams = {
        action: RouterAction.PERMIT_BORROW,
        vault: Address.from(AddressZero),
        amount: BigNumber.from(1),
        spender: ADDRESS_TWO,
        owner: ADDRESS_ONE,
        deadline: 24 * 60 * 60,
      };

      const vault = new BorrowingVault(
        Address.from('0xfF4606Aa93e576E61b473f4B11D3e32BB9ec63BB'),
        WNATIVE[ChainId.GOERLI],
        USDC[ChainId.GOERLI]
      ).setConnection(config);

      const digest = await vault.signPermitFor(params);
      expect(digest).toEqual(
        '0x194a90fe3d33fe2643bce3659ccd2ac8ee1eeaa63b4f1954a35f3eebbbb232b0'
      );
    });

    it('signs a separate withdrawal permit', async () => {
      const params: PermitParams = {
        action: RouterAction.PERMIT_WITHDRAW,
        vault: Address.from(AddressZero),
        amount: BigNumber.from(1),
        spender: ADDRESS_TWO,
        owner: ADDRESS_ONE,
        deadline: 24 * 60 * 60,
      };

      const vault = new BorrowingVault(
        Address.from('0xfF4606Aa93e576E61b473f4B11D3e32BB9ec63BB'),
        WNATIVE[ChainId.GOERLI],
        USDC[ChainId.GOERLI]
      ).setConnection(config);

      const digest = await vault.signPermitFor(params);
      expect(digest).toEqual(
        '0x9a7fbfae8f9e80e022f93fd7da27509378374fcee6527c2e04494eae972c04f3'
      );
    });

    it('signs two permits and incrments nonce', async () => {
      const borrowParams: PermitParams = {
        action: RouterAction.PERMIT_BORROW,
        vault: Address.from(AddressZero),
        amount: BigNumber.from(1),
        spender: ADDRESS_TWO,
        owner: ADDRESS_ONE,
        deadline: 24 * 60 * 60,
      };
      const withdrawParams: PermitParams = {
        action: RouterAction.PERMIT_WITHDRAW,
        vault: Address.from(AddressZero),
        amount: BigNumber.from(1),
        spender: ADDRESS_TWO,
        owner: ADDRESS_ONE,
        deadline: 24 * 60 * 60,
      };

      const vault = new BorrowingVault(
        Address.from('0xfF4606Aa93e576E61b473f4B11D3e32BB9ec63BB'),
        WNATIVE[ChainId.GOERLI],
        USDC[ChainId.GOERLI]
      ).setConnection(config);

      const digestBorrow = await vault.signPermitFor(borrowParams);
      expect(digestBorrow).toEqual(
        '0x194a90fe3d33fe2643bce3659ccd2ac8ee1eeaa63b4f1954a35f3eebbbb232b0'
      );

      const digestWithdraw = await vault.signPermitFor(withdrawParams);
      expect(digestWithdraw).toEqual(
        '0xebe476294730b15271b46248a4c6e41448357e0293b7a37ed46bb6d64f2b0103'
      );
    });
  });

  //const deposit: DepositParams = {
  //action: RouterAction.DEPOSIT,
  //vault: vault.address,
  //amount: BigNumber.from(1),
  //sender: Address.from(owner.address),
  //receiver: Address.from(owner.address),
  //};
  //const permitBorrow: PermitParams = {
  //action: RouterAction.PERMIT_BORROW,
  //vault: vault.address,
  //amount: BigNumber.from(1),
  //owner: Address.from(owner.address),
  //spender: ADDRESS_TWO,
  //deadline: 24 * 60 * 60,
  //};
  //const borrow: BorrowParams = {
  //action: RouterAction.BORROW,
  //vault: vault.address,
  //amount: BigNumber.from(1),
  //receiver: Address.from(owner.address),
  //owner: Address.from(owner.address),
  //};
  describe('#getBorrowTXData', () => {
    it.only('signs a separate borrow permit', async () => {
      const vault = new BorrowingVault(
        Address.from('0xfF4606Aa93e576E61b473f4B11D3e32BB9ec63BB'),
        WNATIVE[ChainId.GOERLI],
        USDC[ChainId.GOERLI]
      ).setConnection(config);
      const owner = new Wallet(PRIVATE_KEY);

      const actions = vault.previewDepositAndBorrow(
        parseUnits('1'),
        parseUnits('1'),
        ChainId.GOERLI,
        ChainId.GOERLI,
        Address.from(owner.address)
      );

      const permitBorrow = actions.find(
        (a) => a.action === RouterAction.PERMIT_BORROW
      ) as PermitParams;
      const digest = await vault.signPermitFor(permitBorrow);

      const skey = new utils.SigningKey('0x' + PRIVATE_KEY);
      const signature = skey.signDigest(digest);
      vault.getTxDetails(actions, signature.compact);
    });
  });

  describe('#needSignature', () => {
    it('returns false with empty array', () => {
      expect(BorrowingVault.needSignature([])).toBeFalsy();
    });

    it('returns false with simple array', () => {
      const actions: RouterActionParams[] = [
        depositActionParams,
        borrowActionParams,
      ];
      expect(BorrowingVault.needSignature(actions)).toBeFalsy();
    });

    it('returns false with compound array', () => {
      const actions: (RouterActionParams | RouterActionParams[])[] = [
        depositActionParams,
        borrowActionParams,
        [depositActionParams, borrowActionParams],
      ];
      expect(BorrowingVault.needSignature(actions)).toBeFalsy();
    });

    it('returns true with simple array for borrows', () => {
      const actions: RouterActionParams[] = [
        depositActionParams,
        borrowPermitActionParams,
        borrowActionParams,
      ];
      expect(BorrowingVault.needSignature(actions)).toBeTruthy();
    });

    it('returns true with simple array for withdrawals', () => {
      const actions: RouterActionParams[] = [
        depositActionParams,
        withdrawPermitActionParams,
        borrowActionParams,
      ];
      expect(BorrowingVault.needSignature(actions)).toBeTruthy();
    });

    it('returns true with compound array (permit in first level) for borrows', () => {
      const actions: (RouterActionParams | RouterActionParams[])[] = [
        depositActionParams,
        borrowPermitActionParams,
        borrowActionParams,
        [depositActionParams, borrowActionParams],
      ];
      expect(BorrowingVault.needSignature(actions)).toBeTruthy();
    });

    it('returns true with compound array (permit in first level) for withdrawals', () => {
      const actions: (RouterActionParams | RouterActionParams[])[] = [
        depositActionParams,
        withdrawPermitActionParams,
        borrowActionParams,
        [depositActionParams, borrowActionParams],
      ];
      expect(BorrowingVault.needSignature(actions)).toBeTruthy();
    });

    it('returns true with compound array (permit in second level) for borrows', () => {
      const actions: (RouterActionParams | RouterActionParams[])[] = [
        depositActionParams,
        borrowActionParams,
        [depositActionParams, borrowPermitActionParams, borrowActionParams],
      ];
      expect(BorrowingVault.needSignature(actions)).toBeTruthy();
    });

    it('returns true with compound array (permit in second level) for withdrawals', () => {
      const actions: (RouterActionParams | RouterActionParams[])[] = [
        depositActionParams,
        borrowActionParams,
        [depositActionParams, withdrawPermitActionParams, borrowActionParams],
      ];
      expect(BorrowingVault.needSignature(actions)).toBeTruthy();
    });

    it('returns true with compound array (permit in both levels)', () => {
      const actions: (RouterActionParams | RouterActionParams[])[] = [
        depositActionParams,
        borrowPermitActionParams,
        borrowActionParams,
        [depositActionParams, withdrawPermitActionParams, borrowActionParams],
      ];
      expect(BorrowingVault.needSignature(actions)).toBeTruthy();
    });
  });
});
