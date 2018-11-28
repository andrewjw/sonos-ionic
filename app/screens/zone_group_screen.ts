import { Device } from "device";
import document from "document";

import * as messages from "../../common/messages";
import AlbumArt from "../albumart";
import Messenger from "../messenger";
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

    constructor(
        doc: typeof document,
        private me: Device,
        private messenger: Messenger,
        changeScreen: (screen: Screen) => void,
        private albumart: AlbumArt
    ) {
        super(doc, "zone-group-screen", changeScreen);

        this.messenger.sendMessage({
            messageType: messages.AppMessageType.GET_ZONE_GROUPS
        });
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            case messages.CompanionMessageType.ZONE_GROUPS:
                this.waiting(false);

                this.zoneGroups = msg.zoneGroups;

                const VTList = this.doc.getElementById("zone_group_list") as VirtualTileList;

                const NUM_ELEMS = this.zoneGroups.length;

                VTList.delegate = {
                    getTileInfo: function(index) {
                        return {
                            type: "zone-group-pool",
                            value: "Menu item",
                            index: index
                        };
                    },
                    configureTile: (tile, info) => {
                        if (info.type === "zone-group-pool") {
                            tile.getElementById("text").text = this.zoneGroups[info.index].name;
                            const touch = tile.getElementById("touch-me");
                            touch.onclick = () => {
                                console.log("touched", JSON.stringify(this.zoneGroups[info.index].name));
                                this.changeScreen(
                                    new PlayScreen(
                                        this.doc,
                                        this.me,
                                        this.messenger,
                                        this.zoneGroups[info.index].uuid,
                                        this.changeScreen,
                                        this.albumart
                                    )
                                );
                            };
                        }
                    }
                };

                // VTList.length must be set AFTER VTList.delegate
                VTList.length = NUM_ELEMS;
                break;
            default:
                console.error("Unhandled message " + JSON.stringify(msg));
        }
    }
}
