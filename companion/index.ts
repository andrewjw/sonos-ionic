/// <reference path="../node_modules/@types/node/index.d.ts" />

import * as messaging from "messaging";

import * as messages from "../common/messages";
import updateAlbumArt from "./albumart";
import AVTransport from "./sonos/avtransport";
import Topology from "./sonos/topology";

const topology = new Topology("192.168.1.117");

function getZoneGroups() {
    topology.getTopology()
    .then((groups) => {
        const zoneGroups: messages.IZoneGroup[] = [];
        for (const group of groups) {
            zoneGroups.push({ uuid: group.id, name: group.getName() });
        }
        console.log("sending zone groups " + JSON.stringify(zoneGroups));
        sendMessage({
            messageType: messages.CompanionMessageType.ZONE_GROUPS,
            zoneGroups,
        });
    });
}

function getTransportInfo(uuid: string) {
    topology.getIpForZoneGroup(uuid).then((ip: string) => {
      const av = new AVTransport(ip);
      av.getTransportInfo().then((info) => {
          sendMessage({
              messageType: messages.CompanionMessageType.TRANSPORT_INFO,
              transportState: info.transportState,
              uuid,
          });
      });
    });
}

// Listen for the onopen event
messaging.peerSocket.onopen = () => {
    console.log("Got a connection from the watch.");
};

messaging.peerSocket.onmessage = (evt: any): void => {
  const msg = evt.data as messages.IAppMessage;

  console.log("got message " + JSON.stringify(msg));
  switch (msg.messageType) {
      case messages.AppMessageType.GET_ZONE_GROUPS:
        getZoneGroups();
        break;
      case messages.AppMessageType.GET_ZONE_GROUP:
        topology.getTopology().then((groups) => {
            for (const group of groups) {
                if (group.id === msg.uuid) {
                    sendMessage({
                        messageType: messages.CompanionMessageType.ZONE_GROUP,
                        zoneGroup: { uuid: group.id, name: group.getName() },
                    });
                    return;
                }
            }
        });
        break;
      case messages.AppMessageType.GET_TRANSPORT_INFO:
        getTransportInfo(msg.uuid);
        break;
      case messages.AppMessageType.GET_POSITION_INFO:
        topology.getIpForZoneGroup(msg.uuid).then((ip: string) => {
            const av = new AVTransport(ip);
            av.getPositionInfo()
                .then((positionInfo) => {
                    sendMessage({
                        album: positionInfo.album,
                        creator: positionInfo.creator,
                        duration: positionInfo.duration,
                        messageType: messages.CompanionMessageType.POSITION_INFO,
                        title: positionInfo.title,
                        uuid: msg.uuid,
                    });

                    if (positionInfo.albumArtURI) {
                        updateAlbumArt(positionInfo.albumArtURI);
                    }
                });
        });
        break;
      case messages.AppMessageType.PLAY_ZONE_GROUP:
        topology.getIpForZoneGroup(msg.uuid).then((ip: string) => {
            const av = new AVTransport(ip);
            av.play()
                .then(() => getTransportInfo(msg.uuid));
        });
        break;
      case messages.AppMessageType.PAUSE_ZONE_GROUP:
        topology.getIpForZoneGroup(msg.uuid).then((ip: string) => {
            const av = new AVTransport(ip);
            av.pause()
                .then(() => getTransportInfo(msg.uuid));
        });
        break;
      default:
        console.error("Got unhandled message " + JSON.stringify(msg));
  }
};

function sendMessage(msg: messages.ICompanionMessage) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message
        messaging.peerSocket.send(msg);
    }
}
