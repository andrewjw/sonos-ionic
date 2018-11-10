/* tslint:disable:max-classes-per-file */

import { CloseEvent, ErrorEvent, EventMap, MessageEvent, MessageSocket as IMessageSocket, ReadyState } from "messaging";

import MockEvent from "../mock_event";

class OpenEvent extends MockEvent {
}

export default class MessageSocket implements IMessageSocket, EventTarget<EventMap> {
    public readonly CLOSED: "CLOSED";
    public readonly OPEN: "OPEN";
    public readonly MAX_MESSAGE_SIZE: number;
    public readonly bufferedAmount: number;
    public onbufferedamountdecrease: (event: Event) => void;
    public onclose: (event: CloseEvent) => void;
    public onerror: (event: ErrorEvent) => void;
    public onmessage: (event: MessageEvent) => void = null;
    public onopen: (event: Event) => void = null;
    public readonly readyState: ReadyState;

    constructor(private rawSend: (data: any) => void) {}

    public send(data: any): void {
        this.rawSend(data);
    }

    public addEventListener<EventName extends keyof EventMap>(
        type: EventName,
        listener: (event: EventMap[EventName]) => void,
    ): void {
        // add
    }

    public removeEventListener<EventName extends keyof EventMap>(
        eventName: EventName,
    ): void {
        // remove
    }

    public connected(): void {
        if (this.onopen !== null) {
            this.onopen(new OpenEvent());
        }
    }
}
