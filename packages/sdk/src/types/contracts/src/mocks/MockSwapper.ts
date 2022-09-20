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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface MockSwapperInterface extends utils.Interface {
  functions: {
    "oracle()": FunctionFragment;
    "swap(address,address,uint256,address,uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "oracle" | "swap"): FunctionFragment;

  encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;

  events: {};
}

export interface MockSwapper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockSwapperInterface;

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
    oracle(overrides?: CallOverrides): Promise<[string]>;

    swap(
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      amountOut: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      slippage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  oracle(overrides?: CallOverrides): Promise<string>;

  swap(
    assetIn: PromiseOrValue<string>,
    assetOut: PromiseOrValue<string>,
    amountOut: PromiseOrValue<BigNumberish>,
    receiver: PromiseOrValue<string>,
    slippage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    oracle(overrides?: CallOverrides): Promise<string>;

    swap(
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      amountOut: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      slippage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      amountOut: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      slippage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swap(
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      amountOut: PromiseOrValue<BigNumberish>,
      receiver: PromiseOrValue<string>,
      slippage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
