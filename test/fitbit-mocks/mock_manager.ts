import { HttpRequest } from "http-request";
import { MessageSocket as IMessageSocket } from "messaging";

import Network from "../sonos-mocks/network";
import Device from "./app/device";
import Document from "./app/document";
import Inbox from "./app/file-transfer";
import FileTransferBridge from "./bridge/file_transfer_bridge";
import MessagingBridge from "./bridge/messaging_bridge";
import HttpRequestMock from "./companion/fetch";
import Outbox from "./companion/file-transfer";

export default class MockManager {
    private me: Device;
    private fetch: HttpRequestMock;
    private filetransfer: FileTransferBridge;
    private messaging: MessagingBridge;
    private document: Document;

    constructor(private network: Network) {
        this.me = new Device();
        this.document = new Document();
        this.fetch = new HttpRequestMock(network);
        this.filetransfer = new FileTransferBridge();
        this.messaging = new MessagingBridge();
    }

    public getDevice(): Device {
        return this.me;
    }

    public getDocument(): Document {
        return this.document;
    }

    public getFetch(): HttpRequest {
        return this.fetch.fetch;
    }

    public getOutbox(): Outbox {
        return this.filetransfer.getOutbox();
    }

    public getInbox(): Inbox {
        return this.filetransfer.getInbox();
    }

    public getMessagingBridge(): MessagingBridge {
        return this.messaging;
    }

    public getDeviceSocket(): IMessageSocket {
        return this.messaging.getDeviceSocket();
    }

    public getCompanionSocket(): IMessageSocket {
        return this.messaging.getCompanionSocket();
    }
}
