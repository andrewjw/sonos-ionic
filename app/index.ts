import * as messaging from "messaging";

import * as messages from "../common/messages";

import screenZoneGroupList from "./zone_group_list";

console.log("app starting");

// Listen for the onopen event
messaging.peerSocket.onopen = () => {
  const msg: messages.IAppMessage = {
    messageType: messages.AppMessageType.GET_ZONE_GROUPS,
  };

  console.log("connected to companion");
  sendMessage(msg);
};

messaging.peerSocket.onmessage = (evt: any): void => {
  const msg = evt.data as messages.ICompanionMessage;

  switch (msg.messageType) {
      case messages.CompanionMessageType.ZONE_GROUPS:
        console.log("Got zone groups", msg.zoneGroups);
        screenZoneGroupList(msg.zoneGroups);
  }
};

// Listen for the onerror event
messaging.peerSocket.onerror = (err: any): void => {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
};

function sendMessage(msg: messages.IAppMessage): void {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message
        messaging.peerSocket.send(msg);
    }
}
