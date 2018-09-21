/// <reference path="../node_modules/@types/node/index.d.ts" />

import * as messaging from "messaging";

import * as messages from "../common/messages";
import Topology from "./sonos/topology";

function getZoneGroups() {
    new Topology("192.168.1.117").getTopology()
    .then((groups) => {
        const zoneGroups: messages.IZoneGroup[] = [];
        for (const group of groups) {
            zoneGroups.push({ uuid: group.id, name: group.getName() });
        }
        sendMessage({
            messageType: messages.CompanionMessageType.ZONE_GROUPS,
            zoneGroups,
        });
    });
}

// Listen for the onopen event
messaging.peerSocket.onopen = () => {
    console.log("Got a connection from the watch.");
};

messaging.peerSocket.onmessage = (evt: any): void => {
  const msg = evt.data as messages.IAppMessage;

  switch (msg.messageType) {
      case messages.AppMessageType.GET_ZONE_GROUPS:
        getZoneGroups();
  }
};

function sendMessage(msg: messages.ICompanionMessage) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message
        messaging.peerSocket.send(msg);
    }
}
