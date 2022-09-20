/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWeth,
  IWethInterface,
} from "../../../../../../../../../../lib/nxtp/packages/deployments/contracts/contracts/core/connext/interfaces/IWeth";

const _abi = [
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
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
];

export class IWeth__factory {
  static readonly abi = _abi;
  static createInterface(): IWethInterface {
    return new utils.Interface(_abi) as IWethInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IWeth {
    return new Contract(address, _abi, signerOrProvider) as IWeth;
  }
}
