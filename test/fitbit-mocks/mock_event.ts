export default class MockEvent implements Event {
    public readonly defaultPrevented: boolean = false;
    public readonly target: EventTarget = null;
    public readonly type: string = "OpenEvent";
    public preventDefault(): void {
        /* Not Implemented Yet */
    }
    public stopImmediatePropagation(): void {
        /* Not Implemented Yet */
    }
    public stopPropagation(): void {
        /* Not Implemented Yet */
    }
}
