"use strict";
(function (AppMessageType) {
    AppMessageType[AppMessageType["GET_ZONE_GROUPS"] = 0] = "GET_ZONE_GROUPS";
    AppMessageType[AppMessageType["GET_ZONE_GROUP"] = 1] = "GET_ZONE_GROUP";
    AppMessageType[AppMessageType["GET_MEDIA_INFO"] = 2] = "GET_MEDIA_INFO";
    AppMessageType[AppMessageType["GET_TRANSPORT_INFO"] = 3] = "GET_TRANSPORT_INFO";
    AppMessageType[AppMessageType["GET_POSITION_INFO"] = 4] = "GET_POSITION_INFO";
    AppMessageType[AppMessageType["PLAY_ZONE_GROUP"] = 5] = "PLAY_ZONE_GROUP";
    AppMessageType[AppMessageType["PAUSE_ZONE_GROUP"] = 6] = "PAUSE_ZONE_GROUP";
})(exports.AppMessageType || (exports.AppMessageType = {}));
var AppMessageType = exports.AppMessageType;
(function (CompanionMessageType) {
    CompanionMessageType[CompanionMessageType["ZONE_GROUPS"] = 0] = "ZONE_GROUPS";
    CompanionMessageType[CompanionMessageType["ZONE_GROUP"] = 1] = "ZONE_GROUP";
    CompanionMessageType[CompanionMessageType["MEDIA_INFO"] = 2] = "MEDIA_INFO";
    CompanionMessageType[CompanionMessageType["TRANSPORT_INFO"] = 3] = "TRANSPORT_INFO";
    CompanionMessageType[CompanionMessageType["POSITION_INFO"] = 4] = "POSITION_INFO";
    CompanionMessageType[CompanionMessageType["NO_ALBUM_ART"] = 5] = "NO_ALBUM_ART";
})(exports.CompanionMessageType || (exports.CompanionMessageType = {}));
var CompanionMessageType = exports.CompanionMessageType;
