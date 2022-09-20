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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../../../../common";

export interface HomeInterface extends utils.Interface {
  functions: {
    "MAX_MESSAGE_BODY_BYTES()": FunctionFragment;
    "VERSION()": FunctionFragment;
    "committedRoot()": FunctionFragment;
    "count()": FunctionFragment;
    "dispatch(uint32,bytes32,bytes)": FunctionFragment;
    "doubleUpdate(bytes32,bytes32[2],bytes,bytes)": FunctionFragment;
    "homeDomainHash()": FunctionFragment;
    "improperUpdate(bytes32,bytes32,bytes)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "localDomain()": FunctionFragment;
    "nonces(uint32)": FunctionFragment;
    "owner()": FunctionFragment;
    "queueContains(bytes32)": FunctionFragment;
    "queueEnd()": FunctionFragment;
    "queueLength()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "root()": FunctionFragment;
    "setUpdater(address)": FunctionFragment;
    "setUpdaterManager(address)": FunctionFragment;
    "state()": FunctionFragment;
    "suggestUpdate()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "tree()": FunctionFragment;
    "update(bytes32,bytes32,bytes)": FunctionFragment;
    "updater()": FunctionFragment;
    "updaterManager()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "MAX_MESSAGE_BODY_BYTES"
      | "VERSION"
      | "committedRoot"
      | "count"
      | "dispatch"
      | "doubleUpdate"
      | "homeDomainHash"
      | "improperUpdate"
      | "initialize"
      | "localDomain"
      | "nonces"
      | "owner"
      | "queueContains"
      | "queueEnd"
      | "queueLength"
      | "renounceOwnership"
      | "root"
      | "setUpdater"
      | "setUpdaterManager"
      | "state"
      | "suggestUpdate"
      | "transferOwnership"
      | "tree"
      | "update"
      | "updater"
      | "updaterManager"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "MAX_MESSAGE_BODY_BYTES",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "committedRoot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "count", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "dispatch",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "doubleUpdate",
    values: [
      PromiseOrValue<BytesLike>,
      [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "homeDomainHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "improperUpdate",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "localDomain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nonces",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "queueContains",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "queueEnd", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "queueLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "root", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setUpdater",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setUpdaterManager",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "state", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "suggestUpdate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "tree", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "update",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "updater", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updaterManager",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_MESSAGE_BODY_BYTES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "committedRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "dispatch", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "doubleUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "homeDomainHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "improperUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "localDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "queueContains",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "queueEnd", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "queueLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUpdater", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setUpdaterManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "state", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "suggestUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tree", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "update", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updater", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updaterManager",
    data: BytesLike
  ): Result;

  events: {
    "Dispatch(bytes32,uint256,uint64,bytes32,bytes)": EventFragment;
    "DoubleUpdate(bytes32,bytes32[2],bytes,bytes)": EventFragment;
    "ImproperUpdate(bytes32,bytes32,bytes)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "NewUpdater(address,address)": EventFragment;
    "NewUpdaterManager(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Update(uint32,bytes32,bytes32,bytes)": EventFragment;
    "UpdaterSlashed(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Dispatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DoubleUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ImproperUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewUpdater"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewUpdaterManager"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Update"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdaterSlashed"): EventFragment;
}

export interface DispatchEventObject {
  messageHash: string;
  leafIndex: BigNumber;
  destinationAndNonce: BigNumber;
  committedRoot: string;
  message: string;
}
export type DispatchEvent = TypedEvent<
  [string, BigNumber, BigNumber, string, string],
  DispatchEventObject
>;

export type DispatchEventFilter = TypedEventFilter<DispatchEvent>;

export interface DoubleUpdateEventObject {
  oldRoot: string;
  newRoot: [string, string];
  signature: string;
  signature2: string;
}
export type DoubleUpdateEvent = TypedEvent<
  [string, [string, string], string, string],
  DoubleUpdateEventObject
>;

export type DoubleUpdateEventFilter = TypedEventFilter<DoubleUpdateEvent>;

export interface ImproperUpdateEventObject {
  oldRoot: string;
  newRoot: string;
  signature: string;
}
export type ImproperUpdateEvent = TypedEvent<
  [string, string, string],
  ImproperUpdateEventObject
>;

export type ImproperUpdateEventFilter = TypedEventFilter<ImproperUpdateEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface NewUpdaterEventObject {
  oldUpdater: string;
  newUpdater: string;
}
export type NewUpdaterEvent = TypedEvent<
  [string, string],
  NewUpdaterEventObject
>;

export type NewUpdaterEventFilter = TypedEventFilter<NewUpdaterEvent>;

export interface NewUpdaterManagerEventObject {
  updaterManager: string;
}
export type NewUpdaterManagerEvent = TypedEvent<
  [string],
  NewUpdaterManagerEventObject
>;

export type NewUpdaterManagerEventFilter =
  TypedEventFilter<NewUpdaterManagerEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface UpdateEventObject {
  homeDomain: number;
  oldRoot: string;
  newRoot: string;
  signature: string;
}
export type UpdateEvent = TypedEvent<
  [number, string, string, string],
  UpdateEventObject
>;

export type UpdateEventFilter = TypedEventFilter<UpdateEvent>;

export interface UpdaterSlashedEventObject {
  updater: string;
  reporter: string;
}
export type UpdaterSlashedEvent = TypedEvent<
  [string, string],
  UpdaterSlashedEventObject
>;

export type UpdaterSlashedEventFilter = TypedEventFilter<UpdaterSlashedEvent>;

export interface Home extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: HomeInterface;

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
    MAX_MESSAGE_BODY_BYTES(overrides?: CallOverrides): Promise<[BigNumber]>;

    VERSION(overrides?: CallOverrides): Promise<[number]>;

    committedRoot(overrides?: CallOverrides): Promise<[string]>;

    count(overrides?: CallOverrides): Promise<[BigNumber]>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    doubleUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _signature: PromiseOrValue<BytesLike>,
      _signature2: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    homeDomainHash(overrides?: CallOverrides): Promise<[string]>;

    improperUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initialize(
      _updaterManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    localDomain(overrides?: CallOverrides): Promise<[number]>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    queueContains(
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    queueEnd(overrides?: CallOverrides): Promise<[string]>;

    queueLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    root(overrides?: CallOverrides): Promise<[string]>;

    setUpdater(
      _updater: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUpdaterManager(
      _updaterManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    state(overrides?: CallOverrides): Promise<[number]>;

    suggestUpdate(
      overrides?: CallOverrides
    ): Promise<[string, string] & { _committedRoot: string; _new: string }>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tree(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { count: BigNumber }>;

    update(
      _committedRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updater(overrides?: CallOverrides): Promise<[string]>;

    updaterManager(overrides?: CallOverrides): Promise<[string]>;
  };

  MAX_MESSAGE_BODY_BYTES(overrides?: CallOverrides): Promise<BigNumber>;

  VERSION(overrides?: CallOverrides): Promise<number>;

  committedRoot(overrides?: CallOverrides): Promise<string>;

  count(overrides?: CallOverrides): Promise<BigNumber>;

  dispatch(
    _destinationDomain: PromiseOrValue<BigNumberish>,
    _recipientAddress: PromiseOrValue<BytesLike>,
    _messageBody: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  doubleUpdate(
    _oldRoot: PromiseOrValue<BytesLike>,
    _newRoot: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
    _signature: PromiseOrValue<BytesLike>,
    _signature2: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  homeDomainHash(overrides?: CallOverrides): Promise<string>;

  improperUpdate(
    _oldRoot: PromiseOrValue<BytesLike>,
    _newRoot: PromiseOrValue<BytesLike>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initialize(
    _updaterManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  localDomain(overrides?: CallOverrides): Promise<number>;

  nonces(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  owner(overrides?: CallOverrides): Promise<string>;

  queueContains(
    _item: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  queueEnd(overrides?: CallOverrides): Promise<string>;

  queueLength(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  root(overrides?: CallOverrides): Promise<string>;

  setUpdater(
    _updater: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUpdaterManager(
    _updaterManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  state(overrides?: CallOverrides): Promise<number>;

  suggestUpdate(
    overrides?: CallOverrides
  ): Promise<[string, string] & { _committedRoot: string; _new: string }>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tree(overrides?: CallOverrides): Promise<BigNumber>;

  update(
    _committedRoot: PromiseOrValue<BytesLike>,
    _newRoot: PromiseOrValue<BytesLike>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updater(overrides?: CallOverrides): Promise<string>;

  updaterManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    MAX_MESSAGE_BODY_BYTES(overrides?: CallOverrides): Promise<BigNumber>;

    VERSION(overrides?: CallOverrides): Promise<number>;

    committedRoot(overrides?: CallOverrides): Promise<string>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    doubleUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _signature: PromiseOrValue<BytesLike>,
      _signature2: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    homeDomainHash(overrides?: CallOverrides): Promise<string>;

    improperUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      _updaterManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    localDomain(overrides?: CallOverrides): Promise<number>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    owner(overrides?: CallOverrides): Promise<string>;

    queueContains(
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    queueEnd(overrides?: CallOverrides): Promise<string>;

    queueLength(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    root(overrides?: CallOverrides): Promise<string>;

    setUpdater(
      _updater: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setUpdaterManager(
      _updaterManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    state(overrides?: CallOverrides): Promise<number>;

    suggestUpdate(
      overrides?: CallOverrides
    ): Promise<[string, string] & { _committedRoot: string; _new: string }>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tree(overrides?: CallOverrides): Promise<BigNumber>;

    update(
      _committedRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    updater(overrides?: CallOverrides): Promise<string>;

    updaterManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Dispatch(bytes32,uint256,uint64,bytes32,bytes)"(
      messageHash?: PromiseOrValue<BytesLike> | null,
      leafIndex?: PromiseOrValue<BigNumberish> | null,
      destinationAndNonce?: PromiseOrValue<BigNumberish> | null,
      committedRoot?: null,
      message?: null
    ): DispatchEventFilter;
    Dispatch(
      messageHash?: PromiseOrValue<BytesLike> | null,
      leafIndex?: PromiseOrValue<BigNumberish> | null,
      destinationAndNonce?: PromiseOrValue<BigNumberish> | null,
      committedRoot?: null,
      message?: null
    ): DispatchEventFilter;

    "DoubleUpdate(bytes32,bytes32[2],bytes,bytes)"(
      oldRoot?: null,
      newRoot?: null,
      signature?: null,
      signature2?: null
    ): DoubleUpdateEventFilter;
    DoubleUpdate(
      oldRoot?: null,
      newRoot?: null,
      signature?: null,
      signature2?: null
    ): DoubleUpdateEventFilter;

    "ImproperUpdate(bytes32,bytes32,bytes)"(
      oldRoot?: null,
      newRoot?: null,
      signature?: null
    ): ImproperUpdateEventFilter;
    ImproperUpdate(
      oldRoot?: null,
      newRoot?: null,
      signature?: null
    ): ImproperUpdateEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "NewUpdater(address,address)"(
      oldUpdater?: null,
      newUpdater?: null
    ): NewUpdaterEventFilter;
    NewUpdater(oldUpdater?: null, newUpdater?: null): NewUpdaterEventFilter;

    "NewUpdaterManager(address)"(
      updaterManager?: null
    ): NewUpdaterManagerEventFilter;
    NewUpdaterManager(updaterManager?: null): NewUpdaterManagerEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Update(uint32,bytes32,bytes32,bytes)"(
      homeDomain?: PromiseOrValue<BigNumberish> | null,
      oldRoot?: PromiseOrValue<BytesLike> | null,
      newRoot?: PromiseOrValue<BytesLike> | null,
      signature?: null
    ): UpdateEventFilter;
    Update(
      homeDomain?: PromiseOrValue<BigNumberish> | null,
      oldRoot?: PromiseOrValue<BytesLike> | null,
      newRoot?: PromiseOrValue<BytesLike> | null,
      signature?: null
    ): UpdateEventFilter;

    "UpdaterSlashed(address,address)"(
      updater?: PromiseOrValue<string> | null,
      reporter?: PromiseOrValue<string> | null
    ): UpdaterSlashedEventFilter;
    UpdaterSlashed(
      updater?: PromiseOrValue<string> | null,
      reporter?: PromiseOrValue<string> | null
    ): UpdaterSlashedEventFilter;
  };

  estimateGas: {
    MAX_MESSAGE_BODY_BYTES(overrides?: CallOverrides): Promise<BigNumber>;

    VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    committedRoot(overrides?: CallOverrides): Promise<BigNumber>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    doubleUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _signature: PromiseOrValue<BytesLike>,
      _signature2: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    homeDomainHash(overrides?: CallOverrides): Promise<BigNumber>;

    improperUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initialize(
      _updaterManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    localDomain(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    queueContains(
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    queueEnd(overrides?: CallOverrides): Promise<BigNumber>;

    queueLength(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    root(overrides?: CallOverrides): Promise<BigNumber>;

    setUpdater(
      _updater: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUpdaterManager(
      _updaterManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    state(overrides?: CallOverrides): Promise<BigNumber>;

    suggestUpdate(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tree(overrides?: CallOverrides): Promise<BigNumber>;

    update(
      _committedRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updater(overrides?: CallOverrides): Promise<BigNumber>;

    updaterManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    MAX_MESSAGE_BODY_BYTES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    committedRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    count(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    doubleUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
      _signature: PromiseOrValue<BytesLike>,
      _signature2: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    homeDomainHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    improperUpdate(
      _oldRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      _updaterManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    localDomain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queueContains(
      _item: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    queueEnd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queueLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    root(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setUpdater(
      _updater: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUpdaterManager(
      _updaterManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    state(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    suggestUpdate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tree(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    update(
      _committedRoot: PromiseOrValue<BytesLike>,
      _newRoot: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updater(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updaterManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
