import { HttpRequest } from "http-request";
import { MessageSocket as IMessageSocket } from "messaging";

import Network from "../sonos-mocks/network";
import MessagingBridge from "./bridge/messaging_bridge";
import HttpRequestMock from "./companion/fetch";
import Outbox from "./companion/file-transfer";

export default class MockManager {
    private fetch: HttpRequestMock;
    private outbox: Outbox;
    private messaging: MessagingBridge;

    constructor(private network: Network) {
        this.fetch = new HttpRequestMock(network);
        this.outbox = new Outbox();
        this.messaging = new MessagingBridge();
    }

    public getFetch(): HttpRequest {
        return this.fetch.fetch;
    }

    public getOutbox(): Outbox {
        return this.outbox;
    }

    public getMessagingBridge(): MessagingBridge {
        return this.messaging;
    }

    public getCompanionSocket(): IMessageSocket {
        return this.messaging.getCompanionSocket();
    }
}
