import { Outbox } from "file-transfer";
import { HttpRequest } from "http-request";
import { MessageSocket } from "messaging";

import * as messages from "../common/messages";
import AlbumArt from "./albumart";
import Messenger from "./messenger";
import AVTransport from "./sonos/avtransport";
import Topology from "./sonos/topology";

export default class Companion {
    private albumArt: AlbumArt;
    private messenger: Messenger;

    private topology: Topology;

    constructor(private outbox: Outbox, private peerSocket: MessageSocket, private httpRequest: HttpRequest) {
        this.messenger = new Messenger(peerSocket);
        this.albumArt = new AlbumArt(this.outbox, this.messenger, this.httpRequest);
        this.topology = new Topology(this.httpRequest, "192.168.1.117");

        // Listen for the onopen event
        this.peerSocket.onopen = () => {
            console.log("Got a connection from the watch.");
        };

        this.peerSocket.onmessage = this.onMessage.bind(this);
    }

    public start() {
        console.log("start");
    }

    private getZoneGroups(): void {
        this.topology.getTopology().then(groups => {
            const zoneGroups: messages.IZoneGroup[] = [];
            for (const group of groups) {
                zoneGroups.push({ uuid: group.id, name: group.getName() });
            }
            console.log("sending zone groups " + JSON.stringify(zoneGroups));
            this.messenger.sendMessage({
                messageType: messages.CompanionMessageType.ZONE_GROUPS,
                zoneGroups
            });
        });
    }

    private getTransportInfo(uuid: string) {
        console.log("getTransportInfo 1");
        this.topology.getIpForZoneGroup(uuid).then((ip: string) => {
            const av = new AVTransport(this.httpRequest, ip);
            console.log("getTransportInfo 2");
            av.getTransportInfo().then(info => {
                console.log("getTransportInfo 3", info.transportState);
                this.messenger.sendMessage({
                    messageType: messages.CompanionMessageType.TRANSPORT_INFO,
                    transportState: info.transportState,
                    uuid
                });
            });
        });
    }

    private onMessage(evt: any): void {
        const msg = evt.data as messages.IAppMessage;

        console.log("got message " + JSON.stringify(msg));
        switch (msg.messageType) {
            case messages.AppMessageType.GET_ZONE_GROUPS:
                this.getZoneGroups();
                break;
            case messages.AppMessageType.GET_ZONE_GROUP:
                this.topology.getTopology().then(groups => {
                    for (const group of groups) {
                        if (group.id === msg.uuid) {
                            this.messenger.sendMessage({
                                messageType: messages.CompanionMessageType.ZONE_GROUP,
                                zoneGroup: { uuid: group.id, name: group.getName() }
                            });
                            return;
                        }
                    }
                });
                break;
            case messages.AppMessageType.GET_TRANSPORT_INFO:
                this.getTransportInfo(msg.uuid);
                break;
            case messages.AppMessageType.GET_POSITION_INFO:
                this.topology.getIpForZoneGroup(msg.uuid).then((ip: string) => {
                    const av = new AVTransport(this.httpRequest, ip);
                    av.getPositionInfo().then(positionInfo => {
                        this.messenger.sendMessage({
                            album: positionInfo.album,
                            creator: positionInfo.creator,
                            duration: positionInfo.duration,
                            messageType: messages.CompanionMessageType.POSITION_INFO,
                            title: positionInfo.title,
                            uuid: msg.uuid
                        });

                        if (positionInfo.albumArtURI) {
                            this.albumArt.updateAlbumArt(positionInfo.albumArtURI);
                        }
                    });
                });
                break;
            case messages.AppMessageType.PLAY_ZONE_GROUP:
                this.topology.getIpForZoneGroup(msg.uuid).then((ip: string) => {
                    const av = new AVTransport(this.httpRequest, ip);
                    av.play().then(() => this.getTransportInfo(msg.uuid));
                });
                break;
            case messages.AppMessageType.PAUSE_ZONE_GROUP:
                this.topology.getIpForZoneGroup(msg.uuid).then((ip: string) => {
                    const av = new AVTransport(this.httpRequest, ip);
                    av.pause().then(() => this.getTransportInfo(msg.uuid));
                });
                break;
            default:
                console.error("Got unhandled message " + JSON.stringify(msg));
        }
    }
}
