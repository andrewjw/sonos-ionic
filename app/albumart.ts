import { Inbox } from "file-transfer";
import * as fs from "fs";

export default class AlbumArt {
    private albumArt: string = null;
    private callback: () => void = null;

    constructor(private inbox: Inbox) {
        inbox.addEventListener(
            "newfile",
            (event: any): void => {
                let filename = inbox.nextFile();
                while (filename) {
                    if (this.albumArt !== null) {
                        fs.unlinkSync(this.albumArt);
                    }

                    this.albumArt = filename;

                    if (this.callback) {
                        this.callback();
                    }

                    filename = inbox.nextFile();
                }
            }
        );
    }

    public hasAlbumArt(): boolean {
        return this.albumArt !== null;
    }

    public getAlbumArt(): string {
        return this.albumArt;
    }

    public onHasAlbumArt(func: () => void): void {
        this.callback = func;
    }

    public clearAlbumArt(): void {
        this.albumArt = null;

        if (this.callback) {
            this.callback();
        }
    }

    public clearCallback(): void {
        this.callback = null;
    }
}
