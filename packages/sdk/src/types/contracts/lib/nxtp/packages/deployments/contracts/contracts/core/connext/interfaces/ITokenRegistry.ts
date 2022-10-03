/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { Fragment, FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { Call } from "@hovoh/ethcall";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../../../../../../../common";

export interface ITokenRegistryInterface extends utils.Interface {
  functions: {
    "enrollCustom(uint32,bytes32,address)": FunctionFragment;
    "ensureLocalToken(uint32,bytes32)": FunctionFragment;
    "getLocalAddress(uint32,bytes32)": FunctionFragment;
    "getTokenId(address)": FunctionFragment;
    "isLocalOrigin(address)": FunctionFragment;
    "mustHaveLocalToken(uint32,bytes32)": FunctionFragment;
    "oldReprToCurrentRepr(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "enrollCustom"
      | "ensureLocalToken"
      | "getLocalAddress"
      | "getTokenId"
      | "isLocalOrigin"
      | "mustHaveLocalToken"
      | "oldReprToCurrentRepr"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "enrollCustom",
    values: [BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "ensureLocalToken",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getLocalAddress",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "getTokenId", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isLocalOrigin",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "mustHaveLocalToken",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "oldReprToCurrentRepr",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "enrollCustom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ensureLocalToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLocalAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTokenId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isLocalOrigin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mustHaveLocalToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "oldReprToCurrentRepr",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ITokenRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ITokenRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ensureLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getLocalAddress(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { _local: string }>;

    getTokenId(
      _token: string,
      overrides?: CallOverrides
    ): Promise<[number, string]>;

    isLocalOrigin(
      _token: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mustHaveLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    oldReprToCurrentRepr(
      _oldRepr: string,
      overrides?: CallOverrides
    ): Promise<[string] & { _currentRepr: string }>;
  };

  enrollCustom(
    _domain: BigNumberish,
    _id: BytesLike,
    _custom: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ensureLocalToken(
    _domain: BigNumberish,
    _id: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getLocalAddress(
    _domain: BigNumberish,
    _id: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  getTokenId(
    _token: string,
    overrides?: CallOverrides
  ): Promise<[number, string]>;

  isLocalOrigin(_token: string, overrides?: CallOverrides): Promise<boolean>;

  mustHaveLocalToken(
    _domain: BigNumberish,
    _id: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  oldReprToCurrentRepr(
    _oldRepr: string,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: CallOverrides
    ): Promise<void>;

    ensureLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getLocalAddress(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    getTokenId(
      _token: string,
      overrides?: CallOverrides
    ): Promise<[number, string]>;

    isLocalOrigin(_token: string, overrides?: CallOverrides): Promise<boolean>;

    mustHaveLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    oldReprToCurrentRepr(
      _oldRepr: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ensureLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getLocalAddress(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenId(_token: string, overrides?: CallOverrides): Promise<BigNumber>;

    isLocalOrigin(
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mustHaveLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    oldReprToCurrentRepr(
      _oldRepr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ensureLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getLocalAddress(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenId(
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isLocalOrigin(
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mustHaveLocalToken(
      _domain: BigNumberish,
      _id: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    oldReprToCurrentRepr(
      _oldRepr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

export interface ITokenRegistryMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  getLocalAddress(
    _domain: BigNumberish,
    _id: BytesLike,
    overrides?: CallOverrides
  ): Call<string>;

  getTokenId(_token: string, overrides?: CallOverrides): Call<[number, string]>;

  isLocalOrigin(_token: string, overrides?: CallOverrides): Call<boolean>;

  mustHaveLocalToken(
    _domain: BigNumberish,
    _id: BytesLike,
    overrides?: CallOverrides
  ): Call<string>;

  oldReprToCurrentRepr(
    _oldRepr: string,
    overrides?: CallOverrides
  ): Call<string>;
}
