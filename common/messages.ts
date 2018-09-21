export enum AppMessageType {
    GET_ZONE_GROUPS,
}

export interface IGetZoneGroupsMessage {
    messageType: AppMessageType.GET_ZONE_GROUPS;
}

export type IAppMessage = IGetZoneGroupsMessage;

export enum CompanionMessageType {
    ZONE_GROUPS,
}

export interface IZoneGroup {
    uuid: string;
    name: string;
}

export interface IZoneGroupMessage {
    messageType: CompanionMessageType.ZONE_GROUPS;
    zoneGroups: IZoneGroup[];
}

export type ICompanionMessage = IZoneGroupMessage;
