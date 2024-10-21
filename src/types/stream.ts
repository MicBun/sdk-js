import { GenericResponse } from "@kwilteam/kwil-js/dist/core/resreq";
import { TxReceipt } from "@kwilteam/kwil-js/dist/core/tx";
import { EthereumAddress, StreamId, VisibilityEnum } from "../util/types";
import { StreamType } from "./contractValues";

export interface StreamLocator {
    /**
     * the unique identifier of the stream, used as name of the deployed contract
     */
    streamId: StreamId; 
    /**
     * the address of the data provider, it's the deployer of the stream
     */
    dataProvider: EthereumAddress; 
}

export interface GetRecordInput {
    dateFrom?: Date;
    dateTo?: Date;
    frozenAt?: Date;
    baseDate?: Date;
}

export interface GetFirstRecordInput {
    afterDate?: Date;
    frozenAt?: Date;
}

export interface StreamRecord {
    dateValue: Date;
    value: string;
}

export interface IStream {
    /**
     * initializes the stream
     */
    initializeStream(): Promise<GenericResponse<TxReceipt>>;
    /**
     * returns the records of the stream within the given date range
     */
    getRecord(input: GetRecordInput): Promise<StreamRecord[]>;
    /**
     * returns the index of the stream within the given date range
     */
    getIndex(input: GetRecordInput): Promise<StreamRecord[]>;
    /**
     * returns the type of the stream
     */
    getType(): Promise<StreamType>;
    /**
     * returns the first record of the stream
     */
    getFirstRecord(input: GetFirstRecordInput): Promise<StreamRecord | null>;

    /**
     * sets the read visibility of the stream
     */
    setReadVisibility(visibility: VisibilityEnum): Promise<GenericResponse<TxReceipt>>;
    /**
     * returns the read visibility of the stream
     */
    getReadVisibility(): Promise<VisibilityEnum | null>;
    /**
     * sets the compose visibility of the stream
     */
    setComposeVisibility(visibility: VisibilityEnum): Promise<GenericResponse<TxReceipt>>;
    /**
     * returns the compose visibility of the stream
     */
    getComposeVisibility(): Promise<VisibilityEnum | null>;

    /**
     * allows a wallet to read the stream
     */
    allowReadWallet(wallet: EthereumAddress): Promise<GenericResponse<TxReceipt>>;
    /**
     * disables a wallet from reading the stream
     */
    disableReadWallet(wallet: EthereumAddress): Promise<GenericResponse<TxReceipt>>;
    /**
     * allows a stream to use this stream as child
     */
    allowComposeStream(locator: StreamLocator): Promise<GenericResponse<TxReceipt>>;
    /**
     * disables a stream from using this stream as child
     */
    disableComposeStream(locator: StreamLocator): Promise<GenericResponse<TxReceipt>>;

    /**
     * returns the wallets allowed to read the stream
     */
    getAllowedReadWallets(): Promise<EthereumAddress[]>;
    /**
     * returns the streams allowed to compose the stream
     */
    getAllowedComposeStreams(): Promise<StreamLocator[]>;
}