/* tslint:disable:member-ordering interface-name */

declare module "device" {
  interface Screen {
      width: number;
      height: number;
  }

  export interface Device {
    screen: Screen;
  }

  export const me: Device;
}
