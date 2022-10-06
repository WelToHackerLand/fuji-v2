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
} from "../../../common";

export declare namespace IFlasher {
  export type FlashloanParamsStruct = {
    asset: string;
    amount: BigNumberish;
    router: string;
    actions: BigNumberish[];
    args: BytesLike[];
  };

  export type FlashloanParamsStructOutput = [
    string,
    BigNumber,
    string,
    number[],
    string[]
  ] & {
    asset: string;
    amount: BigNumber;
    router: string;
    actions: number[];
    args: string[];
  };
}

export interface FlasherInterface extends utils.Interface {
  functions: {
    "NATIVE()": FunctionFragment;
    "aaveV3Pool()": FunctionFragment;
    "executeOperation(address,uint256,uint256,address,bytes)": FunctionFragment;
    "initiateFlashloan((address,uint256,address,uint8[],bytes[]),uint8)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "NATIVE"
      | "aaveV3Pool"
      | "executeOperation"
      | "initiateFlashloan"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "NATIVE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "aaveV3Pool",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "executeOperation",
    values: [string, BigNumberish, BigNumberish, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initiateFlashloan",
    values: [IFlasher.FlashloanParamsStruct, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "NATIVE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "aaveV3Pool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeOperation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initiateFlashloan",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Flasher extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FlasherInterface;

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
    NATIVE(overrides?: CallOverrides): Promise<[string]>;

    aaveV3Pool(overrides?: CallOverrides): Promise<[string]>;

    executeOperation(
      asset: string,
      amount: BigNumberish,
      premium: BigNumberish,
      initiator: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initiateFlashloan(
      params: IFlasher.FlashloanParamsStruct,
      providerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  NATIVE(overrides?: CallOverrides): Promise<string>;

  aaveV3Pool(overrides?: CallOverrides): Promise<string>;

  executeOperation(
    asset: string,
    amount: BigNumberish,
    premium: BigNumberish,
    initiator: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initiateFlashloan(
    params: IFlasher.FlashloanParamsStruct,
    providerId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    NATIVE(overrides?: CallOverrides): Promise<string>;

    aaveV3Pool(overrides?: CallOverrides): Promise<string>;

    executeOperation(
      asset: string,
      amount: BigNumberish,
      premium: BigNumberish,
      initiator: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initiateFlashloan(
      params: IFlasher.FlashloanParamsStruct,
      providerId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    NATIVE(overrides?: CallOverrides): Promise<BigNumber>;

    aaveV3Pool(overrides?: CallOverrides): Promise<BigNumber>;

    executeOperation(
      asset: string,
      amount: BigNumberish,
      premium: BigNumberish,
      initiator: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initiateFlashloan(
      params: IFlasher.FlashloanParamsStruct,
      providerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    NATIVE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    aaveV3Pool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    executeOperation(
      asset: string,
      amount: BigNumberish,
      premium: BigNumberish,
      initiator: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initiateFlashloan(
      params: IFlasher.FlashloanParamsStruct,
      providerId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

export interface FlasherMulticall {
  address: string;
  abi: Fragment[];
  functions: FunctionFragment[];

  NATIVE(overrides?: CallOverrides): Call<string>;

  aaveV3Pool(overrides?: CallOverrides): Call<string>;
}
