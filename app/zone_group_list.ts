import document from "document";

import * as messages from "../common/messages";

interface IMenuItem {
    type: string;
    value: string;
    index: number;
    text?: string;
}

export default function screenZoneGroupList(zoneGroups: messages.IZoneGroup[]) {
    const VTList = document.getElementById("my-list");

    const NUM_ELEMS = zoneGroups.length;

    VTList.delegate = {
      getTileInfo: function(index: number): IMenuItem {
        return {
          type: "my-pool",
          value: "Menu item",
          index: index
        };
      },
      configureTile: function(tile: any, info: IMenuItem): void {
        if (info.type === "my-pool") {
          tile.getElementById("text").text = zoneGroups[info.index].name;
          const touch = tile.getElementById("touch-me");
          touch.onclick = (evt: any) => {
            console.log(`touched: $‌{info.index}`);
          };
        }
      },
    };

    // VTList.length must be set AFTER VTList.delegate
    VTList.length = NUM_ELEMS;
}
