import { Inbox as IInbox } from "file-transfer";

export default class Inbox implements IInbox {
    public onnewfile: (event: Event) => void;

    public nextFile(): string | undefined {
        return "abc";
    }

    public addEventListener(): void {
        // TODO
    }

    public removeEventListener(): void {
        // TODO
    }
}
