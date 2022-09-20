/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  Flasher,
  FlasherInterface,
} from "../../../../src/flashloans/rinkeby/Flasher";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Flasher__invalidEntryPoint",
    type: "error",
  },
  {
    inputs: [],
    name: "Flasher__invalidFlashloanProvider",
    type: "error",
  },
  {
    inputs: [],
    name: "Flasher__lastActionMustBeSwap",
    type: "error",
  },
  {
    inputs: [],
    name: "Flasher__notAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "Flasher__notEmptyEntryPoint",
    type: "error",
  },
  {
    inputs: [],
    name: "NATIVE",
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
    name: "aaveV3Pool",
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
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeOperation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "enum IRouter.Action[]",
            name: "actions",
            type: "uint8[]",
          },
          {
            internalType: "bytes[]",
            name: "args",
            type: "bytes[]",
          },
        ],
        internalType: "struct IFlasher.FlashloanParams",
        name: "params",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "providerId",
        type: "uint8",
      },
    ],
    name: "initiateFlashloan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class Flasher__factory {
  static readonly abi = _abi;
  static createInterface(): FlasherInterface {
    return new utils.Interface(_abi) as FlasherInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Flasher {
    return new Contract(address, _abi, signerOrProvider) as Flasher;
  }
}
