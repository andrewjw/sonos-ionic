export default class Device {
    public firmwareVersion: string = "mock";

    public lastSyncTime: Date = new Date();

    public modelId: string = "";
    public modelName: string = "Ionic";

    public readonly screen: {
        readonly width: number;
        readonly height: number;
    } = { width: 348, height: 250 };

    public readonly type: "WATCH" | "TRACKER" = "WATCH";
}
