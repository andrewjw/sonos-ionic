/* tslint:disable:no-unused-expression */

import { expect } from "chai";
import { describe, it } from "mocha";

import MockManager from "./fitbit-mocks/mock_manager";
import Network from "./sonos-mocks/network";
import ZonePlayer from "./sonos-mocks/zone_player";

import * as messages from "../common/messages";
import Companion from "../companion/companion";

import App from "../app/app";

describe("Test ZoneGroups Queried On Start", () => {
    it("Test Zones Queried", done => {
        const network = new Network();
        const zp1 = new ZonePlayer("A", "192.168.1.117", "ZP1");
        network.addZonePlayer("192.168.1.117", zp1);
        const mocks = new MockManager(network);

        const app = new App(mocks.getDevice(), mocks.getDocument(), mocks.getDeviceSocket(), mocks.getInbox());
        const companion = new Companion(mocks.getOutbox(), mocks.getCompanionSocket(), mocks.getFetch());

        expect(companion).to.be.not.null;

        mocks.getMessagingBridge().getDeviceSocket().onmessage = evt => {
            const data = evt.data as messages.ICompanionMessage;
            expect(data).to.be.not.null;
            expect(data.messageType).to.be.equal(messages.CompanionMessageType.ZONE_GROUPS);
            const zps = (data as messages.IZoneGroupsMessage).zoneGroups;
            expect(zps.length).to.be.equal(1);
            expect(zps[0].name).to.be.equal("ZP1");

            done();
        };

        mocks.getMessagingBridge().connected();
    });

    it("Test Zones Displayed", done => {
        const network = new Network();
        const zp1 = new ZonePlayer("A", "192.168.1.117", "ZP1");
        network.addZonePlayer("192.168.1.117", zp1);
        const mocks = new MockManager(network);

        const app = new App(mocks.getDevice(), mocks.getDocument(), mocks.getDeviceSocket(), mocks.getInbox());
        const companion = new Companion(mocks.getOutbox(), mocks.getCompanionSocket(), mocks.getFetch());

        expect(companion).to.be.not.null;

        mocks.getMessagingBridge().onDeviceFinished.push(() => {
            expect(
                mocks
                    .getDocument()
                    .getElementById("zone-group-pool[0]")
                    .getElementsByTagName("text")[0].text
            ).to.be.equal("ZP1");

            done();
        });

        mocks.getMessagingBridge().connected();
    });
});
