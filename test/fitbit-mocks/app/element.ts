/* tslint:disable:max-classes-per-file */

class EventMap {}

export default class Element {
    public readonly class: string;
    public readonly firstChild: Element | null;
    public readonly id: string;
    public readonly image: string;
    public layer: number;
    public mode: number | [number, number];
    public readonly nextSibling: Element | null;
    public readonly parent: Element | null;
    public state: ElementState;
    public text: string;
    public readonly type: string;
    public value: number | [number, number];
    public enabled: boolean;

    public onactivate: (event: Event) => void = null;
    public onanimationend: (event: AnimationEvent) => void = null;
    public onanimationiteration: (event: AnimationEvent) => void = null;
    public onanimationstart: (event: AnimationEvent) => void = null;
    public onclick: (event: MouseEvent) => void = null;
    public oncollapse: (event: Event) => void = null;
    public ondisable: (event: Event) => void = null;
    public onenable: (event: Event) => void = null;
    public onexpand: (event: Event) => void = null;
    public onhighlight: (event: Event) => void = null;
    public onkeydown: (event: KeyboardEvent) => void = null;
    public onkeypress: (event: KeyboardEvent) => void = null;
    public onkeyup: (event: KeyboardEvent) => void = null;
    public onlistbackward: (event: ListScrollEvent) => void = null;
    public onlistforward: (event: ListScrollEvent) => void = null;
    public onload: (event: LoadEvent) => void = null;
    public onmousedown: (event: MouseEvent) => void = null;
    public onmousemove: (event: MouseEvent) => void = null;
    public onmouseout: (event: MouseEvent) => void = null;
    public onmouseover: (event: MouseEvent) => void = null;
    public onmouseup: (event: MouseEvent) => void = null;
    public onpagescroll: (event: PageScrollEvent) => void = null;
    public onreload: (event: Event) => void = null;
    public onselect: (event: Event) => void = null;
    public onunhighlight: (event: Event) => void = null;
    public onunload: (event: Event) => void = null;
    public onunselect: (event: Event) => void = null;

    private attributes: { [key: string]: string };
    private children: Element[] = [];

    constructor(public tagName: string, raw: any) {
        this.replace(tagName, raw);
    }

    public getElementById(id: string): Element {
        if (this.attributes.hasOwnProperty("id") && this.attributes.id === id) {
            return this;
        } else {
            for (const ele of this.children) {
                const r = ele.getElementById(id);
                if (r !== null) {
                    return r;
                }
            }
        }

        return null;
    }

    public getElementsByClassName(className: string): Element[] {
        // TODO
        return [];
    }

    public getElementsByTagName<TagName extends keyof ElementSearchMap>(
        tagName: TagName
    ): Array<ElementSearchMap[TagName]> {
        // TODO
        return [];
    }

    public replace(tagName: string, raw: any) {
        this.tagName = tagName;
        this.attributes = raw.hasOwnProperty("$") ? raw.$ : {};
        if (raw.hasOwnProperty("$$")) {
            for (const ele of raw.$$) {
                this.children.push(new Element(ele["#name"], ele));
            }
        }
    }

    public animate(trigger: string): void {
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

    public sendEvent(): void {
        // TODO
    }
}
