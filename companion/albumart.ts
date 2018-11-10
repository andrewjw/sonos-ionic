import { Outbox } from "file-transfer";
import { HttpRequest, HttpResponse } from "http-request";

import * as messages from "../common/messages";
import Messenger from "./messenger";

export default class AlbumArt {
    private currentAlbumArt: string = null;

    private count = 0;

    constructor(private outbox: Outbox, private messenger: Messenger, private httpRequest: HttpRequest) {}

    public updateAlbumArt(albumArtURI: string) {
        if (albumArtURI === this.currentAlbumArt) {
            return;
        }

        this.currentAlbumArt = albumArtURI;

        if (this.currentAlbumArt !== null) {
            this.getAlbumArt(albumArtURI);
        } else {
            this.messenger.sendMessage({
                messageType: messages.CompanionMessageType.NO_ALBUM_ART,
            });
        }
    }

    public getAlbumArt(albumArtURI: string) {
        console.log("getting Album Art", albumArtURI);
        this.httpRequest(albumArtURI, {}).then((response: HttpResponse) => {
            if (!response.headers.has("content-type") || response.headers.get("content-type") !== "image/jpeg") {
                // Fitbit devices only support jpgs
                return;
            }
            return response.arrayBuffer().then((buffer: any) => {
                this.count++;
                return this.outbox.enqueue("albumart" + this.count + ".jpg", buffer);
            });
        });
    }
}
