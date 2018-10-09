/* tslint:disable:member-ordering interface-name */

declare module "file-transfer" {
    interface Inbox {
        addEventListener(event: string, callback: any): void;

        nextFile(): string | null;
    }

    export const inbox: Inbox;
}
