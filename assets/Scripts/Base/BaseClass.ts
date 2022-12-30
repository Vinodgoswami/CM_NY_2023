import { _decorator, Component, Node, instantiate, Prefab } from "cc";

const { ccclass, property } = _decorator;

@ccclass("BaseClass")
export class BaseClass extends Component {
    @property(Prefab) popUpPrefab: Prefab = null;
    @property(Prefab) timePrefab: Prefab = null;
    @property(Prefab) circularLoaderPrefab: Prefab = null;

    timer: Node = null;
    popUp: Node = null;
    circularLoader: Node = null;

    start() {}

    initBaseClass(parentForComponents: Node) {
        if (this.timePrefab) {
            this.timer = instantiate(this.timePrefab);
            parentForComponents.addChild(this.timer);
        }

        if (this.popUpPrefab) {
            this.popUp = instantiate(this.popUpPrefab);
            parentForComponents.addChild(this.popUp);
        }

        if (this.circularLoaderPrefab) {
            this.circularLoader = instantiate(this.circularLoaderPrefab);
            parentForComponents.addChild(this.circularLoader);
        }
    }
}
