import Screen from "./screen";

import * as messages from "../../common/messages";
import ZoneGroupScreen from "./zone_group_screen";

export default class Waiting extends Screen {
    constructor(changeScreen: (screen: Screen) => void) {
        super("waiting", changeScreen);
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            case messages.CompanionMessageType.ZONE_GROUPS:
              this.changeScreen(new ZoneGroupScreen(msg.zoneGroups, this.changeScreen));
              break;
            default:
              console.error("Unhandled message " + JSON.stringify(msg));
        }
    }
}
