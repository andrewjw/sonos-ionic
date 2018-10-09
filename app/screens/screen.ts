import document from "document";

import { ICompanionMessage } from "../../common/messages";

export default abstract class Screen {
    constructor(private screenName: string,
                protected changeScreen: (screen: Screen) => void,
                initialWait: boolean = true) {
        this.waiting(initialWait);
    }

    public abstract onMessage(msg: ICompanionMessage): void;

    public cleanup(): void {
        // No cleanup required.
    }

    protected waiting(wait: boolean): void {
        for (const screen of document.getElementsByClassName("screen")) {
            if (screen.id === (wait ? "waiting" : this.screenName)) {
                screen.style.display = "inline";
            } else {
                screen.style.display = "none";
            }
        }
    }
}
