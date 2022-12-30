import { Component, Enum, isValid, Rect, Size, Sprite, UITransform, _decorator } from "cc";
import { EDITOR } from "cc/env";

export enum AspectRatioFitType {
  None,
  FitVertical,
  FitHorizontal,
  Envelope,
  FitInside,
  Stretch,
}

const { ccclass, property, executeInEditMode } = _decorator;

@ccclass("AspectRatioFitter")
@executeInEditMode
export class AspectRatioFitter extends Component {
  @property(Sprite) sprite: Sprite = null;

  @property({ type: Enum(AspectRatioFitType), serializable: true, visible: false })
  private _fitMode: AspectRatioFitType = AspectRatioFitType.Envelope;
  @property({ type: Enum(AspectRatioFitType) })
  get fitMode() {
    return this._fitMode;
  }
  set fitMode(value) {
    this._fitMode = value;
    this.onSizeChanged();
  }

  onLoad() {
    if (EDITOR) {
      this.sprite = this.getComponent(Sprite);
    }

    this.onSizeChanged();
    this.node.parent.on("size-changed", this.onSizeChanged, this);
  }

  onDestroy() {
    if (isValid(this.node, true)) this.node.parent.off("size-changed", this.onSizeChanged, this);
  }

  onSizeChanged() {
    if (this.sprite === null) return;

    var spriteSize: Size = this.sprite.spriteFrame.originalSize;
    if (this.sprite.trim) {
      let _rect: Rect = this.sprite.spriteFrame.rect;
      spriteSize = new Size(_rect.width, _rect.height);
    }
    var widthFactor: number = this.node.parent.getComponent(UITransform).width / spriteSize.width;
    var heightFactor: number = this.node.parent.getComponent(UITransform).height / spriteSize.height;

    switch (this.fitMode) {
      case AspectRatioFitType.Envelope:
        var multFactor: number = Math.max(widthFactor, heightFactor);
        this.node.getComponent(UITransform).width = spriteSize.width * multFactor;
        this.node.getComponent(UITransform).height = spriteSize.height * multFactor;
        break;
      case AspectRatioFitType.FitVertical:
        this.node.getComponent(UITransform).height = this.node.parent.getComponent(UITransform).height;
        this.node.getComponent(UITransform).width = spriteSize.width * heightFactor;
        break;
      case AspectRatioFitType.FitHorizontal:
        this.node.getComponent(UITransform).width = this.node.parent.getComponent(UITransform).width;
        this.node.getComponent(UITransform).height = spriteSize.height * widthFactor;
        break;
      case AspectRatioFitType.FitInside:
        var multFactor: number = Math.min(widthFactor, heightFactor);
        this.node.getComponent(UITransform).width = spriteSize.width * multFactor;
        this.node.getComponent(UITransform).height = spriteSize.height * multFactor;
        break;
      case AspectRatioFitType.Stretch:
        this.node.getComponent(UITransform).width = this.node.parent.getComponent(UITransform).width;
        this.node.getComponent(UITransform).height = this.node.parent.getComponent(UITransform).height;
        break;
      default:
        break;
    }
  }
}
