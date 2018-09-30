/* tslint:disable:member-ordering interface-name */

declare module "document" {
  export interface Element {
    id: string;

    text: string;

    style: any;

    delegate: any;

    length: number;

    onclick: (evt: any) => void;

    getElementById(id: string): Element | null;

    getElementsByTagName(tagName: string): Element[] | null;

    state: string;
  }

  export interface Document {
    getElementsByClassName(className: string): Element[] | null;

    getElementById(id: string): Element | null;
  }

  const document: Document;

  export default document;
}
