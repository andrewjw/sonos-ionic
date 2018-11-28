import { Device } from "device";
import document from "document";
import { Inbox } from "file-transfer";
import { MessageSocket } from "messaging";

import * as messages from "../common/messages";

import AlbumArt from "./albumart";
import Messenger from "./messenger";
import NoPhone from "./screens/no_phone";
import Screen from "./screens/screen";
import ZoneGroupScreen from "./screens/zone_group_screen";

export default class App {
    private currentScreen: Screen;

    private albumart: AlbumArt;
    private messenger: Messenger;

    constructor(private me: Device, private doc: typeof document, private socket: MessageSocket, private inbox: Inbox) {
        console.warn("app starting");

        this.messenger = new Messenger(socket);

        this.changeScreen = this.changeScreen.bind(this);

        this.currentScreen = new NoPhone(this.doc, this.changeScreen);

        this.albumart = new AlbumArt(this.inbox);

        // Listen for the onopen event
        socket.onopen = () => {
            console.warn("connected to companion");

            this.changeScreen(new ZoneGroupScreen(this.doc, this.me, this.messenger, this.changeScreen, this.albumart));
        };

        socket.onmessage = (evt): void => {
            const msg = evt.data as messages.ICompanionMessage;

            this.currentScreen.onMessage(msg);
        };

        // Listen for the onerror event
        socket.onerror = (err: any): void => {
            // Handle any errors
            console.error("Connection error: " + err.code + " - " + err.message);

            this.changeScreen(new NoPhone(this.doc, this.changeScreen));
        };
    }

    private changeScreen(screen: Screen) {
        this.currentScreen.cleanup();
        this.currentScreen = screen;
    }
}
