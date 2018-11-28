import { Device } from "device";
import document from "document";

import * as messages from "../../common/messages";
import { TransportState } from "../../common/transport";
import AlbumArt from "../albumart";
import Messenger from "../messenger";
import Screen from "./screen";

export default class PlayScreen extends Screen {
    private transportState: TransportState = TransportState.STOPPED;

    private title: string = "";
    private creator: string = "";
    private album: string = "";

    private play: ImageElement;
    private pause: ImageElement;
    private art: ImageElement;

    constructor(
        doc: typeof document,
        private me: Device,
        private messenger: Messenger,
        private uuid: string,
        changeScreen: (screen: Screen) => void,
        private albumart: AlbumArt
    ) {
        super(doc, "play-screen", changeScreen);

        this.play = this.doc.getElementById("play_button") as ImageElement;
        this.pause = this.doc.getElementById("pause_button") as ImageElement;
        this.art = this.doc.getElementById("albumart") as ImageElement;

        this.messenger.sendMessage({
            messageType: messages.AppMessageType.GET_TRANSPORT_INFO,
            uuid: this.uuid
        });

        this.messenger.sendMessage({
            messageType: messages.AppMessageType.GET_POSITION_INFO,
            uuid: this.uuid
        });

        this.messenger.sendMessage({
            messageType: messages.AppMessageType.GET_ZONE_GROUP,
            uuid: this.uuid
        });

        this.play.onclick = this.click_play.bind(this);
        this.pause.onclick = this.click_pause.bind(this);

        this.doc.getElementById("marquee").state = "disabled";

        setTimeout(() => {
            this.doc.getElementById("marquee").state = "enabled";
        }, 2000);

        this.onMessage = this.onMessage.bind(this);

        this.albumart.onHasAlbumArt(this.updateState.bind(this));

        this.updateState();
    }

    public cleanup() {
        this.albumart.clearCallback();
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        switch (msg.messageType) {
            case messages.CompanionMessageType.TRANSPORT_INFO:
                this.transportState = msg.transportState;
                this.updateState();
                break;
            case messages.CompanionMessageType.ZONE_GROUP:
                const zoneGroupName = this.doc.getElementById("zone-group-name");
                zoneGroupName.text = msg.zoneGroup.name;
                break;
            case messages.CompanionMessageType.POSITION_INFO:
                this.title = msg.title || "";
                this.creator = msg.creator || "";
                this.album = msg.album || "";
                this.updateState();
                break;
            case messages.CompanionMessageType.NO_ALBUM_ART:
                this.albumart.clearAlbumArt();
                break;
            default:
                console.error("Unhandled message " + JSON.stringify(msg));
        }
    }

    private updateState() {
        this.waiting(false);
        if (this.albumart.hasAlbumArt()) {
            this.art.href = "/private/data/" + this.albumart.getAlbumArt();
            this.art.style.display = "inline";

            this.play.x = this.me.screen.width * 0.25 - 32;
            this.play.y = this.me.screen.height * 0.5 - 32;
            this.pause.x = this.me.screen.width * 0.25 - 32;
            this.pause.y = this.me.screen.height * 0.5 - 32;
        } else {
            this.art.style.display = "none";
            this.play.x = this.me.screen.width * 0.5 - 32;
            this.play.y = this.me.screen.height * 0.5 - 32;
            this.pause.x = this.me.screen.width * 0.5 - 32;
            this.pause.y = this.me.screen.height * 0.5 - 32;
        }

        if (this.transportState === TransportState.PAUSED_PLAYBACK || this.transportState === TransportState.STOPPED) {
            this.pause.style.display = "none";
            this.play.style.display = "inline";
        } else {
            this.pause.style.display = "inline";
            this.play.style.display = "none";
        }

        for (const text of this.doc.getElementById("marquee").getElementsByTagName("text")) {
            if (this.title !== "" && this.creator !== "") {
                text.text = this.title + " by " + this.creator;
            } else if (this.title !== "") {
                text.text = this.title;
            } else {
                text.text = "";
            }
        }
    }

    private click_play(): void {
        this.messenger.sendMessage({
            messageType: messages.AppMessageType.PLAY_ZONE_GROUP,
            uuid: this.uuid
        });
    }

    private click_pause(): void {
        this.messenger.sendMessage({
            messageType: messages.AppMessageType.PAUSE_ZONE_GROUP,
            uuid: this.uuid
        });
    }
}
