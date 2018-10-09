import Screen from "./screen";

import * as messages from "../../common/messages";

export default class Waiting extends Screen {
    constructor(changeScreen: (screen: Screen) => void) {
        super("waiting", changeScreen);
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            default:
              console.error("Unhandled message " + JSON.stringify(msg));
        }
    }
}
