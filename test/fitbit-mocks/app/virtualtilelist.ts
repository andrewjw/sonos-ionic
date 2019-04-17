import ElementImpl from "./element";
import GraphicsElementImpl from "./graphicselement";
import VirtualTileListItemImpl from "./virtualtilelistitemimpl";

export default class VirtualTileListElement extends GraphicsElementImpl implements VirtualTileList {
    public delegate: VirtualTileListDelegate;
    public readonly firstVisibleTile: number;
    public readonly lastVisibleTile: number;
    public overflow: "inherit" | "visible" | "hidden";
    private tileLength: number;

    public redraw(): void {
        // TODO
    }

    public updateTile(position: number, options?: VirtualTileListItemUpdateOptions): void {
        const info = this.delegate.getTileInfo(position);

        const pool = this.getElementById(info.type + "[" + position + "]") as ElementImpl;
        const baseTile = pool.findRoot().getElementById(pool.getAttribute("href").slice(1)) as ElementImpl;

        const tile = new VirtualTileListItemImpl(this, "virtualtilelistitem", {
            $: {},
            $$: []
        });
        tile.replaceChildren([baseTile.clone()]);

        pool.replaceChildren([tile]);

        this.delegate.configureTile(tile, info);
    }

    get length(): number {
        return this.tileLength;
    }

    set length(tiles: number) {
        for (let i: number = 0; i < tiles; i++) {
            this.updateTile(i, null);
        }

        this.tileLength = tiles;
    }
}
