/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPoolAddressProvider,
  IPoolAddressProviderInterface,
} from "../../../../src/interfaces/aaveV3/IPoolAddressProvider";

const _abi = [
  {
    inputs: [],
    name: "getPool",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolDataProvider",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IPoolAddressProvider__factory {
  static readonly abi = _abi;
  static createInterface(): IPoolAddressProviderInterface {
    return new utils.Interface(_abi) as IPoolAddressProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPoolAddressProvider {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IPoolAddressProvider;
  }
}
