import ElementImpl from "./element";
import VirtualTileListElement from "./virtualtilelist";

export default function createElement(parent: ElementImpl | null, ele: any): ElementImpl {
    if (ele.hasOwnProperty("$") && ele.$.hasOwnProperty("href") && ele.$.href === "#tile-list") {
        return new VirtualTileListElement(parent, ele["#name"], ele);
    } else {
        return new ElementImpl(parent, ele["#name"], ele);
    }
}
