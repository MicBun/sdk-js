import { StreamType } from "../types/contractValues.js";
import { TxReceipt } from "@kwilteam/kwil-js/dist/core/tx.js";
import { Kwil } from "@kwilteam/kwil-js/dist/client/kwil.js";
import { DeployBody } from "@kwilteam/kwil-js/dist/core/database.js";
import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload.js";
import { composedStreamTemplate, primitiveStreamTemplate } from "../contracts/contractsContent.js";
import { GenericResponse } from "@kwilteam/kwil-js/dist/core/resreq.js";
import { KwilSigner } from "@kwilteam/kwil-js";
import { StreamId } from "../util/StreamId.js";

export interface DeployStreamInput {
  streamId: StreamId;
  streamType: StreamType;
  kwilClient: Kwil<any>;
  kwilSigner: KwilSigner;
  synchronous?: boolean;
}

export interface DeployStreamOutput {
  receipt: TxReceipt
}

/**
 * Deploys a stream to TSN.
 * @param input - The input parameters for deploying the stream.
 * @returns The transaction hash of the deployment.
 */
export async function deployStream(input: DeployStreamInput): Promise<GenericResponse<TxReceipt>> {
  try {
    const schema = await getContract(input.streamType);

    schema.name = input.streamId.getId();

    const txHash = await input.kwilClient.deploy({
      schema,
    }, input.kwilSigner, input.synchronous);

    return txHash;
  } catch (error) {
    throw new Error(`Failed to deploy stream: ${error}`);
  }
}

/**
 * Returns the contract content based on the stream type.
 * @param streamType - The type of the stream.
 * @returns The contract content as a Uint8Array.
 */
async function getContract(streamType: StreamType): Promise<CompiledKuneiform> {
  switch (streamType) {
    case StreamType.Composed:
      return composedStreamTemplate;
    case StreamType.Primitive:
      return primitiveStreamTemplate;
    default:
      throw new Error(`Unknown stream type: ${streamType}`);
  }
}
