import * as messaging from "messaging";

import * as messages from "../common/messages";

import handleAlbumArt from "./albumart";
import NoPhone from "./screens/no_phone";
import Screen from "./screens/screen";
import ZoneGroupScreen from "./screens/zone_group_screen";

console.log("app starting");

function changeScreen(screen: Screen) {
    currentScreen.cleanup();
    currentScreen = screen;
}

let currentScreen: Screen = new NoPhone(changeScreen);

handleAlbumArt();

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
