import document from "document";
import Screen from "./screen";

import * as messages from "../../common/messages";

export default class NoPhone extends Screen {
    constructor(doc: typeof document, changeScreen: (screen: Screen) => void) {
        super(doc, "no-phone", changeScreen, false);
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            default:
                console.error("Unhandled message " + JSON.stringify(msg));
        }
    }
}
