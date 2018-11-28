import document from "document";
import Screen from "./screen";

import * as messages from "../../common/messages";

export default class Waiting extends Screen {
    constructor(doc: typeof document, changeScreen: (screen: Screen) => void) {
        super(doc, "waiting", changeScreen);
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            default:
                console.error("Unhandled message " + JSON.stringify(msg));
        }
    }
}
