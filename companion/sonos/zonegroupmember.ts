const uuidRegExp = new RegExp("UUID=\"([^\"]+)\"");
const locationRegExp = new RegExp("Location=\"([^\"]+)\"");
const zonenameRegExp = new RegExp("ZoneName=\"([^\"]+)\"");
const invisibleRegExp = new RegExp("Invisible=\"([^\"]+)\"");

export default class ZoneGroupMember {
    public static fromXML(xml: string): ZoneGroupMember {
        if (invisibleRegExp.exec(xml)) {
            return null;
        }

        const uuid = uuidRegExp.exec(xml)[1];
        const location = locationRegExp.exec(xml)[1];
        const zonename = zonenameRegExp.exec(xml)[1];

        return new ZoneGroupMember(uuid, location, zonename);
    }

    constructor(public uuid: string, public location: string, public zonename: string) {}
}
