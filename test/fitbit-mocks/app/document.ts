/* tslint:disable:max-classes-per-file */

import { readFileSync } from "fs";
import * as xml2js from "xml2js";

import Element from "./element";

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

    constructor() {
        const docxml = readFileSync("resources/index.gui");
        this.root = new Element("fake", {});
        const parser = new xml2js.Parser({
            charsAsChildren: true,
            explicitChildren: true,
            preserveChildrenOrder: true
        });
        parser.parseString(docxml, (err, result) => {
            const rootTag = Object.keys(result)[0];
            this.root.replace(rootTag, result[rootTag]);
        });
    }

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
        return this.root.getElementById(id);
    }

    public getElementsByClassName(className: string): Element[] {
        // TODO
        return [];
    }

    public getElementsByTagName(
        tagName: "image" | "text" | "rect" | "line" | "circle" | "textarea" | "arc" | "gradientRect" | "gradientArc"
    ): Array<
        | ImageElement
        | TextElement
        | RectElement
        | LineElement
        | CircleElement
        | TextAreaElement
        | ArcElement
        | GradientRectElement
        | GradientArcElement
    > {
        // TODO
        return [];
    }
}
