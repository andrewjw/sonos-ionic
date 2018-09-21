import ZoneGroupMember from "./zonegroupmember";

export default class ZoneGroup {
    public static fromXML(xml: string): ZoneGroup {
        const opentagRegExp = new RegExp("<ZoneGroup ([^>]+)>");
        const coordinatorRegExp = new RegExp("Coordinator=\"([^\"]+)\"");
        const idRegExp = new RegExp("ID=\"([^\"]+)\"");
        const membersRegExp = new RegExp("(<ZoneGroupMember .*?/>)", "g");

        const openTag = opentagRegExp.exec(xml)[1];
        const coordinator = coordinatorRegExp.exec(openTag)[1];
        const id = idRegExp.exec(openTag)[1];

        const members: ZoneGroupMember[] = [];
        let m: RegExpExecArray = null;
        do {
            m = membersRegExp.exec(xml);

            if (m) {
                const zgm = ZoneGroupMember.fromXML(m[1]);
                if (zgm) {
                    members.push(zgm);
                }
            }
        } while (m);

        if (members.length === 0) {
            return null;
        } else {
            return new ZoneGroup(id, coordinator, members);
        }
    }

    constructor(public id: string, public coordinator: string, public members: ZoneGroupMember[]) {}

    public getCoordinator(): ZoneGroupMember {
        for (const member of this.members) {
            if (member.uuid === this.coordinator) {
                return member;
            }
        }

        return null;
    }

    public getName(): string {
        if (this.members.length === 1) {
            return this.getCoordinator().zonename;
        } else {
            return this.getCoordinator().zonename + " + " + (this.members.length - 1);
        }
    }
}
