import { me } from "device";
import document from "document";
import { ImageElement } from "document";

import * as messages from "../../common/messages";
import { TransportState } from "../../common/transport";
import { clearAlbumArt, clearCallback, getAlbumArt, hasAlbumArt, onHasAlbumArt } from "../albumart";
import sendMessage from "../send_message";
import Screen from "./screen";

export default class PlayScreen extends Screen {
    private transportState: TransportState = TransportState.STOPPED;

    private title: string = "";
    private creator: string = "";
    private album: string = "";

    constructor(private uuid: string,
                changeScreen: (screen: Screen) => void) {
        super("play-screen", changeScreen);

        sendMessage({
            messageType: messages.AppMessageType.GET_TRANSPORT_INFO,
            uuid: this.uuid,
        });

        sendMessage({
            messageType: messages.AppMessageType.GET_POSITION_INFO,
            uuid: this.uuid,
        });

        sendMessage({
            messageType: messages.AppMessageType.GET_ZONE_GROUP,
            uuid: this.uuid,
        });

        document.getElementById("play_button").onclick = this.click_play.bind(this);
        document.getElementById("pause_button").onclick = this.click_pause.bind(this);

        document.getElementById("marquee").state = "disabled";

        setTimeout(() => {
          document.getElementById("marquee").state = "enabled";
        }, 2000);

        this.onMessage = this.onMessage.bind(this);

        onHasAlbumArt(this.updateState.bind(this));

        this.updateState();
    }

    public cleanup() {
        clearCallback();
    }

    public onMessage(msg: messages.ICompanionMessage): void {
        console.log(JSON.stringify(msg));
        switch (msg.messageType) {
            case messages.CompanionMessageType.TRANSPORT_INFO:
              this.transportState = msg.transportState;
              this.updateState();
              break;
            case messages.CompanionMessageType.ZONE_GROUP:
              const zoneGroupName = document.getElementById("zone-group-name");
              zoneGroupName.text = msg.zoneGroup.name;
              break;
            case messages.CompanionMessageType.POSITION_INFO:
              this.title = msg.title || "";
              this.creator = msg.creator || "";
              this.album = msg.album || "";
              this.updateState();
              break;
            case messages.CompanionMessageType.NO_ALBUM_ART:
              clearAlbumArt();
              break;
            default:
              console.error("Unhandled message " + JSON.stringify(msg));
        }
    }

    private updateState() {
        this.waiting(false);

        const play = document.getElementById("play_button");
        const pause = document.getElementById("pause_button");

        if (hasAlbumArt()) {
            console.log("has album art");
            (document.getElementById("albumart") as ImageElement).href = "/private/data/" + getAlbumArt();
            document.getElementById("albumart").style.display = "inline";

            document.getElementById("play_button").x = me.screen.width * 0.25 - 32;
            document.getElementById("play_button").y = me.screen.height * 0.5 - 32;
            document.getElementById("pause_button").x = me.screen.width * 0.25 - 32;
            document.getElementById("pause_button").y = me.screen.height * 0.5 - 32;
        } else {
            document.getElementById("albumart").style.display = "none";
            document.getElementById("play_button").x = me.screen.width * 0.5 - 32;
            document.getElementById("play_button").y = me.screen.height * 0.5 - 32;
            document.getElementById("pause_button").x = me.screen.width * 0.5 - 32;
            document.getElementById("pause_button").y = me.screen.height * 0.5 - 32;
        }

        if (this.transportState === TransportState.PAUSED_PLAYBACK || this.transportState === TransportState.STOPPED) {
            pause.style.display = "none";
            play.style.display = "inline";
        } else {
            pause.style.display = "inline";
            play.style.display = "none";
        }

        for (const text of document.getElementById("marquee").getElementsByTagName("text")) {
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
        sendMessage({
            messageType: messages.AppMessageType.PLAY_ZONE_GROUP,
            uuid: this.uuid,
        });
    }

    private click_pause(): void {
        sendMessage({
            messageType: messages.AppMessageType.PAUSE_ZONE_GROUP,
            uuid: this.uuid,
        });
    }
}
