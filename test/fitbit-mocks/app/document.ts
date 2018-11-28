/* tslint:disable:max-classes-per-file */

type EventHandler = (event: Event) => boolean;

class EventMap {}

export default class Document implements GlobalEvents {
    public readonly default: Document;

    public readonly root: Element;

    public onactivate: (event: Event) => void;
    public onanimationend: (event: AnimationEvent) => void;
    public onanimationiteration: (event: AnimationEvent) => void;
    public onanimationstart: (event: AnimationEvent) => void;
    public onclick: (event: MouseEvent) => void;
    public oncollapse: (event: Event) => void;
    public ondisable: (event: Event) => void;
    public onenable: (event: Event) => void;
    public onexpand: (event: Event) => void;
    public onhighlight: (event: Event) => void;
    public onkeydown: (event: KeyboardEvent) => void;
    public onkeypress: (event: KeyboardEvent) => void;
    public onkeyup: (event: KeyboardEvent) => void;
    public onlistbackward: (event: ListScrollEvent) => void;
    public onlistforward: (event: ListScrollEvent) => void;
    public onload: (event: LoadEvent) => void;
    public onmousedown: (event: MouseEvent) => void;
    public onmousemove: (event: MouseEvent) => void;
    public onmouseout: (event: MouseEvent) => void;
    public onmouseover: (event: MouseEvent) => void;
    public onmouseup: (event: MouseEvent) => void;
    public onpagescroll: (event: PageScrollEvent) => void;
    public onreload: (event: Event) => void;
    public onselect: (event: Event) => void;
    public onunhighlight: (event: Event) => void;
    public onunload: (event: Event) => void;
    public onunselect: (event: Event) => void;

    public getEventHandler(elementType: string): EventHandler | null {
        // TODO
        return null;
    }

    public setEventHandler(elementType: string, handler: EventHandler): void {
        // TODO
    }

    public addEventListener<EventName extends keyof EventMap>(
        type: EventName,
        eventListener: (event: EventMap[EventName]) => void
    ): void {
        // TODO
    }
    public removeEventListener<EventName extends keyof EventMap>(
        eventName: EventName,
        eventListener: (event: EventMap[EventName]) => void
    ): void {
        // TODO
    }

    public getElementById(id: string): Element {
        // TODO
        return null;
    }

    public getElementsByClassName(className: string): Element[] {
        // TODO
        return [];
    }

    public getElementsByTagName(tagName: string | number): Element[] {
        // TODO
        return [];
    }
}
