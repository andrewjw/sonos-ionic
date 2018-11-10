import { TransportState } from "./transport";

export enum AppMessageType {
    GET_ZONE_GROUPS = 1000,
    GET_ZONE_GROUP,
    GET_MEDIA_INFO,
    GET_TRANSPORT_INFO,
    GET_POSITION_INFO,
    PLAY_ZONE_GROUP,
    PAUSE_ZONE_GROUP
}

export interface IAppSimpleMessage {
    messageType: AppMessageType.GET_ZONE_GROUPS;
}

export interface IAppZoneGroupMessage {
    messageType:
        | AppMessageType.GET_MEDIA_INFO
        | AppMessageType.GET_ZONE_GROUP
        | AppMessageType.GET_TRANSPORT_INFO
        | AppMessageType.GET_POSITION_INFO
        | AppMessageType.PLAY_ZONE_GROUP
        | AppMessageType.PAUSE_ZONE_GROUP;
    uuid: string;
}

export type IAppMessage = IAppSimpleMessage | IAppZoneGroupMessage;

export enum CompanionMessageType {
    ZONE_GROUPS,
    ZONE_GROUP,
    MEDIA_INFO,
    TRANSPORT_INFO,
    POSITION_INFO,
    NO_ALBUM_ART
}

export interface IZoneGroup {
    uuid: string;
    name: string;
}

export interface IZoneGroupsMessage {
    messageType: CompanionMessageType.ZONE_GROUPS;
    zoneGroups: IZoneGroup[];
}

export interface IZoneGroupMessage {
    messageType: CompanionMessageType.ZONE_GROUP;
    zoneGroup: IZoneGroup;
}

export interface IMediaInfoMessage {
    messageType: CompanionMessageType.MEDIA_INFO;
    uuid: string;
    transportState: TransportState;
}

export interface IPositionInfoMessage {
    messageType: CompanionMessageType.POSITION_INFO;
    uuid: string;
    duration: number;
    title: string;
    creator: string;
    album: string;
}

export interface ITransportInfoMessage {
    messageType: CompanionMessageType.TRANSPORT_INFO;
    uuid: string;
    transportState: TransportState;
}

export interface ISimpleMessage {
    messageType: CompanionMessageType.NO_ALBUM_ART;
}

export type ICompanionMessage =
    | IZoneGroupsMessage
    | IZoneGroupMessage
    | IMediaInfoMessage
    | IPositionInfoMessage
    | ITransportInfoMessage
    | ISimpleMessage;
