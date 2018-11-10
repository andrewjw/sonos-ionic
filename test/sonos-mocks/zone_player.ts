export default class ZonePlayer {
    private uuid: string;

    constructor(id: string, private ip: string, private name: string) {
        this.uuid = "RINGCON_" + id;
    }

    public get(path: string): string {
        switch (path) {
            case "/ZoneGroupTopology/Control":
                return this.zgTopology();
            default:
                console.warn("Unhandled ZonePlayer url: " + path);
                return null;
        }
    }

    private zgTopology(): string {
        return `<ZoneGroups>
<ZoneGroup Coordinator="${this.uuid}" ID="${this.uuid}:85">
<ZoneGroupMember UUID="${this.uuid}"
                 Location="http://${this.ip}:1400/xml/device_description.xml"
                 ZoneName="${this.name}" />
</ZoneGroup>
</ZoneGroups>`;
    }
}
