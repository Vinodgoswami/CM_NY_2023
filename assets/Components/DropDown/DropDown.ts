import { _decorator, Component, Node, Prefab, JsonAsset, ScrollView, instantiate, Button, Label, tween, Vec3, EventHandler } from "cc";
import { Option } from "./Option";
const { ccclass, property } = _decorator;

@ccclass("DropDown")
export class DropDown extends Component {
    @property({ type: Prefab }) optionPrefab: Prefab = null;
    @property({ type: JsonAsset }) optionsJson: JsonAsset = null;
    @property({ type: ScrollView }) scrollView: ScrollView = null;
    @property({ type: Node }) arrow: Node = null;
    @property({ type: Label }) selected: Label = null;
    @property(EventHandler) dropEvents: EventHandler[] = [];

    isOpen: boolean = false;
    start() {
        this.populateOptions(this.optionsJson.json["options"]);
        this.openDropDown(false);
    }

    populateOptions(options: any[]) {
        let newOption: Node = null;
        options.forEach((option) => {
            newOption = instantiate(this.optionPrefab);
            newOption.getComponent(Option).initOption(option, this.node);
            this.scrollView.content.addChild(newOption);
        });
    }

    callback = (event: any, customEventData: string) => {
        this.selected.string = customEventData;
        this.dropEvents[0].customEventData = customEventData;
        EventHandler.emitEvents(this.dropEvents, this);
        this.openDropDown(false);
    };

    clicked(event: any, customEventData: string) {
        this.openDropDown(!this.isOpen);
    }

    openDropDown(isOpen: boolean) {
        this.isOpen = isOpen;
        if (isOpen) {
            this.arrow.angle = -90;
            this.playPopUpOpenAnimation(this.scrollView.node);
        } else {
            this.arrow.angle = 0;
            this.scrollView.node.active = false;
        }
    }

    playPopUpOpenAnimation(node: Node) {
        node.setScale(new Vec3(1, 0.6, 0));

        tween(node)
            .call(() => {
                node.active = true;
            })
            .to(0, { scale: new Vec3(1, 0.6, 0) })
            .to(0.099, { scale: new Vec3(1, 1.15, 1) })
            .to(0.0462, { scale: new Vec3(1, 1, 1) })
            .to(0.0462, { scale: new Vec3(1, 1.06, 1) })
            .to(0.066, { scale: new Vec3(1, 1, 1) })
            .start();
    }

    update(deltaTime: number) {}
}
