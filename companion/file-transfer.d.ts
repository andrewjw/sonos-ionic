/* tslint:disable:member-ordering interface-name */

declare module "file-transfer" {

    interface FileTransfer {
        name: string;
    }

    interface Outbox {
        enqueue(filename: string, data: ArrayBuffer): Promise<FileTransfer>;
    }

    export const outbox: Outbox;
}
