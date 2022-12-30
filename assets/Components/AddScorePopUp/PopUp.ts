import { _decorator, Component, Node, Label, Animation, Vec3, tween, Prefab, instantiate } from "cc";
import { playPopUpOpenAnimation } from "../../Scripts/Common/Utility";
import { SliderWithIncDec } from "../SliderWithIncDec/SliderWithIncDec";
const { ccclass, property } = _decorator;

/**
 * @title PopUp class
 * @author harpinder_singh
 * @notice this class manages the popUps.
 */
@ccclass("PopUp")
export class PopUp extends Component {
  //PopUp for score update
  @property(Label) message: Label = null!;
  @property(Node) popUpBox: Node = null!;
  @property(Prefab) scoreSlider: Prefab = null!;
  callbackFromParent: Function = () => {};
  start() {}

  onLoad() {
    this.node.active = false;
    // this.popUpBox.scale = new Vec3(0, 0, 1);
    let scoreSlider = instantiate(this.scoreSlider);
    this.popUpBox.addChild(scoreSlider);
  }

  showPopUp(msgString: string, func: Function, score: number) {
    this.node.active = true;
    this.callbackFromParent = func;
    this.message.string = msgString;
    // playPopUpOpenAnimation(this.popUpBox);
    this.popUpBox.getChildByName("SliderWithIncDec").getComponent(SliderWithIncDec).setProgress(score);
  }
  score = (value: string) => {
    console.log("Score value", value);
    this.callbackFromParent(value);
  };

  okButtonCallback(event: any, customEventData: any) {
    this.node.active = false;
    this.popUpBox.getChildByName("SliderWithIncDec").getComponent(SliderWithIncDec).scoreCallback(this.score);
    // tween(this.popUpBox)
    //   .to(0.3, { scale: new Vec3(0, 0, 1) })
    //   .call(() => {
    //     this.node.active = false;
    //   })
    //   .start();
  }
}
