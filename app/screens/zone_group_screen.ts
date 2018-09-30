import document from "document";

import * as messages from "../../common/messages";
import sendMessage from "../send_message";
import PlayScreen from "./play_screen";
import Screen from "./screen";

interface IMenuItem {
    type: string;
    value: string;
    index: number;
    text?: string;
}

export default class ZoneGroupScreen extends Screen {
    private zoneGroups: messages.IZoneGroup[] = [];

    constructor(changeScreen: (screen: Screen) => void) {
        super("zone-group-screen", changeScreen);

        sendMessage({
            messageType: messages.AppMessageType.GET_ZONE_GROUPS,
        });
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            case messages.CompanionMessageType.ZONE_GROUPS:
                this.waiting(false);

                this.zoneGroups = msg.zoneGroups;

                const VTList = document.getElementById("zone_group_list");

                const NUM_ELEMS = this.zoneGroups.length;

                VTList.delegate = {
                  getTileInfo: function(index: number): IMenuItem {
                    return {
                      type: "zone-group-pool",
                      value: "Menu item",
                      index: index
                    };
                  },
                  configureTile: (function(tile: any, info: IMenuItem): void {
                    if (info.type === "zone-group-pool") {
                      tile.getElementById("text").text = this.zoneGroups[info.index].name;
                      const touch = tile.getElementById("touch-me");
                      touch.onclick = (evt: any) => {
                        console.log("touched", JSON.stringify(this.zoneGroups[info.index].name));
                        this.changeScreen(new PlayScreen(this.zoneGroups[info.index].uuid, this.changeScreen));
                      };
                    }
                  }).bind(this),
                };

                // VTList.length must be set AFTER VTList.delegate
                VTList.length = NUM_ELEMS;
                break;
            default:
              console.error("Unhandled message " + JSON.stringify(msg));
        }
    }
}
