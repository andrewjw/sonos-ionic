import ElementImpl from "./element";

export default class GraphicsElementImpl extends ElementImpl implements GraphicsElement {
    public height: number;
    public width: number;
    public x: number;
    public y: number;

    public style: Style;

    public getBBox(): DOMRect {
        return null;
    }
}
