import { FileTransfer, FileTransferOptions, Outbox as IOutbox } from "file-transfer";

export default class Outbox implements IOutbox {
    public enqueue(
        name: string,
        data: ArrayBuffer | ArrayBufferView,
        options?: FileTransferOptions | undefined,
    ): Promise<FileTransfer> {
        return null;
    }
}
