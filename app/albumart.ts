import { inbox } from "file-transfer";
import * as fs from "fs";

let albumArt: string = null;
let callback: () => void = null;

export default function handleAlbumArt(): void {
    inbox.addEventListener("newfile", (event: any): void => {
        let filename = inbox.nextFile();
        while (filename) {
            console.log("got album art", filename);

            if (albumArt !== null) {
                fs.unlinkSync(albumArt);
            }

            albumArt = filename;

            if (callback) {
                callback();
            }

            filename = inbox.nextFile();
        }
    });
}

export function hasAlbumArt(): boolean {
    return albumArt !== null;
}

export function getAlbumArt(): string {
    return albumArt;
}

export function onHasAlbumArt(func: () => void): void {
    callback = func;
}

export function clearCallback(): void {
    callback = null;
}
