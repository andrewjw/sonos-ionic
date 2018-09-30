import * as messaging from "messaging";

import * as messages from "../common/messages";

import NoPhone from "./screens/no_phone";
import Screen from "./screens/screen";
import { TransportState } from "../common/transport";
import PlayScreen from "./screens/play_screen";
import Waiting from "./screens/waiting";
import ZoneGroupScreen from "./screens/zone_group_screen";
import sendMessage from "./send_message";

console.log("app starting");

function changeScreen(screen: Screen) {
    currentScreen = screen;
}

let currentScreen: Screen = new NoPhone(changeScreen);

// Listen for the onopen event
messaging.peerSocket.onopen = () => {
  console.log("connected to companion");

  changeScreen(new ZoneGroupScreen(changeScreen));
};

messaging.peerSocket.onmessage = (evt: any): void => {
  const msg = evt.data as messages.ICompanionMessage;

  currentScreen.onMessage(msg);
};

// Listen for the onerror event
messaging.peerSocket.onerror = (err: any): void => {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);

  changeScreen(new NoPhone(changeScreen));
};
