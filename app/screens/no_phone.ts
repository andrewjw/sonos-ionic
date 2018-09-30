import Screen from "./screen";

import * as messages from "../../common/messages";

export default class NoPhone extends Screen {
    constructor(changeScreen: (screen: Screen) => void) {
        super("no-phone", changeScreen, false);
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            default:
              console.error("Unhandled message " + JSON.stringify(msg));
        }
    }
}
