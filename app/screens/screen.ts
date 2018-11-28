import document from "document";

import { ICompanionMessage } from "../../common/messages";

export default abstract class Screen {
    constructor(
        protected doc: typeof document,
        private screenName: string,
        protected changeScreen: (screen: Screen) => void,
        initialWait: boolean = true
    ) {
        this.waiting(initialWait);
    }

    public abstract onMessage(msg: ICompanionMessage): void;

    public cleanup(): void {
        // No cleanup required.
    }

    protected waiting(wait: boolean): void {
        for (const screen of this.doc.getElementsByClassName("screen") as GraphicsElement[]) {
            screen.style.display = screen.id === (wait ? "waiting" : this.screenName) ? "inline" : "none";
        }
    }
}
