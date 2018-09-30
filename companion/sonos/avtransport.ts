import Service from "./service";

import { TransportState } from "../../common/transport";

export interface ITransportInfo {
    transportState: TransportState;
}

export interface IPositionInfo {
    duration: number;
    title: string;
    creator: string;
    album: string;
}

export default class AVTransport extends Service {
    constructor(rootIp: string) {
        super(rootIp, "AVTransport", "/MediaRenderer/AVTransport/Control");
    }

    public getMediaInfo(): Promise<string> {
        return this.request("GetMediaInfo", { InstanceID: 0 }).then((text: string) => {
            return text;
        });
    }

    public getPositionInfo(): Promise<IPositionInfo> {
        const durationRegExp = new RegExp("duration=\"(\d+):(\d+):(\d+)\"");
        const titleRegExp = new RegExp("<dc:title>(.+)</dc:title>");
        const creatorRegExp = new RegExp("<dc:creator>(.+)</dc:creator>");
        const albumRegExp = new RegExp("<upnp:album>(.+)</upnp:album>");

        return this.request("GetPositionInfo", { InstanceID: 0 }).then((text: string) => {
            const durationMatch = durationRegExp.exec(text);
            let duration: number = null;
            if (durationMatch) {
                duration = parseInt(durationMatch[1], 10) * 60 * 60
                           + parseInt(durationMatch[2], 10) * 60
                           + parseInt(durationMatch[3], 10);
            }
            const title = titleRegExp.exec(text)[1];
            const creator = creatorRegExp.exec(text)[1];
            const album = albumRegExp.exec(text)[1];

            return {
                album, creator, duration, title,
            };
        });
    }

    public getTransportInfo(): Promise<ITransportInfo> {
        const currentTransportStateRegExp = new RegExp("<CurrentTransportState>(.+)</CurrentTransportState>");

        return this.request("GetTransportInfo", { InstanceID: 0 }).then((text: string) => {
            const transportState = currentTransportStateRegExp.exec(text)[1];
            return {
                transportState: TransportState[transportState as any] as any,
            };
        });
    }

    public play(): Promise<boolean> {
        return this.request("Play", { InstanceID: 0, Speed: 1 })
            .then((data) => {
                console.log(data);
                return true;
            });
    }

    public pause(): Promise<boolean> {
        return this.request("Pause", { InstanceID: 0 })
            .then(() => true);
    }
}
