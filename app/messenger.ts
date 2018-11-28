import { MessageSocket } from "messaging";

import * as messages from "../common/messages";

export default class Messenger {
    constructor(private socket: MessageSocket) {}

    public sendMessage(msg: messages.IAppMessage): void {
        if (this.socket.readyState === this.socket.OPEN) {
            // Send the data to peer as a message
            this.socket.send(msg);
        }
    }
}
