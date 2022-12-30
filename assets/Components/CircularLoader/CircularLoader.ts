import { _decorator, Component, Node, Label, Animation, Vec3 } from "cc";
const { ccclass, property } = _decorator;

/**
 * @title PopUp class
 * @author harpinder_singh
 * @notice this class manages the popUps.
 */
@ccclass("CircularLoader")
export class CircularLoader extends Component {
    @property(Label) message: Label = null!;
    @property(Node) circle: Node = null!;
    start() {}
    onLoad() {
        this.node.active = false;
    }

    showLoader(msgString: string) {
        this.node.active = true;
        this.message.string = msgString;
        this.circle.getComponent(Animation).play();
    }

    stopLoader() {
        this.node.active = false;
        this.circle.getComponent(Animation).stop();
    }
}
