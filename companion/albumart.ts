import { outbox } from "file-transfer";

declare function fetch(url: string, options: any): any;

let currentAlbumArt: string = null;

let count = 0;

export default function updateAlbumArt(albumArtURI: string) {
    if (albumArtURI === currentAlbumArt) {
        return;
    }

    currentAlbumArt = albumArtURI;

    getAlbumArt(albumArtURI);
}

function getAlbumArt(albumArtURI: string) {
    console.log("getting Album Art", albumArtURI);
    fetch(albumArtURI, {}).then((response: any) => {
        if (!response.headers.has("content-type") || response.headers.get("content-type") !== "image/jpeg") {
            // Fitbit devices only support jpgs
            return;
        }
        return response.arrayBuffer().then((buffer: any) => {
            count++;
            return outbox.enqueue("albumart" + count + ".jpg", buffer);
        });
    });
}
