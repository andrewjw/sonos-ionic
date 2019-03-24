/* tslint:disable:max-classes-per-file */

import { MessageEvent as IMessageEvent } from "messaging";

import MockEvent from "../mock_event";
import MessageSocket from "./messaging";

class MessageEvent extends MockEvent implements IMessageEvent {
    public readonly data: any;

    constructor(data: any) {
        super();
        this.data = data;
    }
}

export default class MessagingBridge {
    public onDeviceFinished: Array<() => void> = [];

    private companion = new MessageSocket(this.sendToDevice.bind(this));
    private device = new MessageSocket(this.sendToCompanion.bind(this));

    public getCompanionSocket(): MessageSocket {
        return this.companion;
    }

    public getDeviceSocket(): MessageSocket {
        return this.device;
    }

    public connected(): void {
        this.companion.connected();
        this.device.connected();
    }

    private sendToCompanion(data: any): void {
        const event = new MessageEvent(data);
        this.companion.onmessage(event);
    }

    private sendToDevice(data: any): void {
        const event = new MessageEvent(data);
        this.device.onmessage(event);

        for (const callback of this.onDeviceFinished) {
            callback();
        }
    }
}
