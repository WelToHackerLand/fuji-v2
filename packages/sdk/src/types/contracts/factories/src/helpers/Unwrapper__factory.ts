/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";
import type {
  Unwrapper,
  UnwrapperInterface,
  UnwrapperMulticall,
} from "../../../src/helpers/Unwrapper";
import { Contract as MulticallContract } from "@hovoh/ethcall";
const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_wNative",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "wNative",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export class Unwrapper__factory {
  static readonly abi = _abi;
  static createInterface(): UnwrapperInterface {
    return new utils.Interface(_abi) as UnwrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Unwrapper {
    return new Contract(address, _abi, signerOrProvider) as Unwrapper;
  }
  static multicall(address: string): UnwrapperMulticall {
    return new MulticallContract(
      address,
      _abi
    ) as unknown as UnwrapperMulticall;
  }
}