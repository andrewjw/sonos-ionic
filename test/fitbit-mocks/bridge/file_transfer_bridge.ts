import Inbox from "../app/file-transfer";
import Outbox from "../companion/file-transfer";

export default class FileTransferBridge {
    private inbox: Inbox;
    private outbox: Outbox;

    constructor() {
        this.inbox = new Inbox();
        this.outbox = new Outbox();
    }

    public getInbox(): Inbox {
        return this.inbox;
    }

    public getOutbox(): Outbox {
        return this.outbox;
    }
}
