import { _decorator, Component, Node, Label, Button, NodeEventType, Event, EventHandler } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Option")
export class Option extends Component {
    optionValue: string;
    @property({ type: Label }) optionLabel: Label = null;

    start() {}

    initOption(optionValue: string, node: Node) {
        this.optionValue = optionValue;
        this.optionLabel.string = optionValue;
        const button = this.node.getComponent(Button);

        const clickEventHandler = new EventHandler();
        clickEventHandler.target = node;
        clickEventHandler.component = "DropDown";
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = optionValue;
        button.clickEvents.push(clickEventHandler);
    }
}
