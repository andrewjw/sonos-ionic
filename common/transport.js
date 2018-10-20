"use strict";
(function (TransportState) {
    TransportState[TransportState["STOPPED"] = 0] = "STOPPED";
    TransportState[TransportState["PAUSED_PLAYBACK"] = 1] = "PAUSED_PLAYBACK";
    TransportState[TransportState["PLAYING"] = 2] = "PLAYING";
})(exports.TransportState || (exports.TransportState = {}));
var TransportState = exports.TransportState;
