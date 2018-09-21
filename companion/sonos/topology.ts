import Service from "./service";
import ZoneGroup from "./zonegroup";

export default class Topology extends Service {
    constructor(rootIp: string) {
        super(rootIp, "ZoneGroupTopology", "/ZoneGroupTopology/Control");
    }

    public getTopology(): Promise<ZoneGroup[]> {
        return this.request("GetZoneGroupState").then((text: string) => {
            const zonegroupRegExp = new RegExp("(<ZoneGroup .*?</ZoneGroup>)", "g");

            const groups: ZoneGroup[] = [];
            let m: RegExpExecArray = null;
            do {
                m = zonegroupRegExp.exec(text);

                if (m) {
                    const group = ZoneGroup.fromXML(m[1]);
                    if (group) {
                        groups.push(group);
                    }
                }
            } while (m);

            return groups;
        });
    }
}
