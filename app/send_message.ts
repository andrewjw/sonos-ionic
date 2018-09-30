import * as messaging from "messaging";

import * as messages from "../common/messages";

export default function sendMessage(msg: messages.IAppMessage): void {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message
        messaging.peerSocket.send(msg);
    }
}
