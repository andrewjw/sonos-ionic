import ZonePlayer from "./zone_player";

export default class Network {
    private zonePlayers: {[key: string]: ZonePlayer} = {};

    public addZonePlayer(ip: string, zp: ZonePlayer) {
        this.zonePlayers[ip] = zp;
    }

    public getZonePlayer(ip: string): ZonePlayer {
        if (this.zonePlayers.hasOwnProperty(ip)) {
            return this.zonePlayers[ip];
        } else {
            return null;
        }
    }
}
