import { _decorator, Component, Node, Button, ProgressBar, Sprite, Slider, Label, EventHandler } from "cc";
import { ButtonType } from "../../Scripts/Common/ButtonType";
import { BUTTON_TYPE, UPDATION } from "../../Scripts/Common/Costant";

const { ccclass, property } = _decorator;

@ccclass("SliderWithIncDec")
export class SliderWithIncDec extends Component {
    @property(Node) SliderNode = null!;
    @property(Button) levelValueDec: Button = null!;
    @property(Button) levelValueInc: Button = null!;

    @property(Node) sliderBG = null!;
    @property(Node) sliderBar = null!;
    @property(Node) sliderHandle = null!;

    @property(Node) TouchRestriction = null!;

    @property(Label) scoreValue = null!;

    @property(EventHandler) slideEvents: EventHandler[] = [];

    progressStepValue: number = 1;
    private minRaiseValue: number = 0;
    private minSliderVal: number = 0;
    raiseAmount: number = null!;

    maxValue: number = 10;

    start() {
        this.Active = true;
    }

    setPokerDelegate() {}

    setLevel(updation: UPDATION) {
        let sliderProgress = this.SliderNode.getComponent(Slider).progress;

        let deltaProgress: number = this.progressStepValue / this.maxValue;
        switch (updation) {
            case UPDATION.DECREMENT:
                {
                    let newProgress = sliderProgress - deltaProgress;
                    sliderProgress > 0 && (sliderProgress = newProgress > 0 ? newProgress : sliderProgress);
                }
                break;
            case UPDATION.INCREMENT:
                {
                    let newProgress = sliderProgress + deltaProgress;
                    sliderProgress <= 1 && (sliderProgress = newProgress < 1 ? newProgress : 1);
                }
                break;
        }
        this.setProgress(sliderProgress);
    }
    scoreCallback(func: Function) {
        func(this.scoreValue.string);
    }
    buttonCallback(event: any, customEventData: any) {
        let buttonNode: Node = event.currentTarget;
        let buttonScript = buttonNode.getComponent(ButtonType);
        switch (buttonScript.buttonType) {
            case BUTTON_TYPE.DEC_VALUE:
                {
                    this.setLevel(UPDATION.DECREMENT);
                }
                break;
            case BUTTON_TYPE.INC_VALUE:
                {
                    this.setLevel(UPDATION.INCREMENT);
                }
                break;
        }
    }
    sliderCallback(slider: Slider, customEventData: string) {
        this.setProgress(slider.progress);
    }

    resetSliderToMin() {
        this.minSliderVal = this.minRaiseValue / this.maxValue;
        this.setProgress(this.minSliderVal);
    }

    setProgress(progress: number) {
        let sliderProgressInChips: number = Math.ceil(this.maxValue * progress);
        let bet: number = sliderProgressInChips - (sliderProgressInChips % this.progressStepValue);

        console.log(progress);

        if (bet < this.minRaiseValue) {
            this.resetSliderToMin();
            return true;
        } else if (bet >= this.minRaiseValue) {
            this.SliderNode.getComponent(Slider).progress = progress;
            this.SliderNode.getComponent(ProgressBar).progress = progress;
            this.changeIncDecOfLevel(progress);
            // this.poker.updateRaiseValue(bet.toString());
            this.raiseAmount = bet;
            this.slideEvents[0].customEventData = bet.toString();
            EventHandler.emitEvents(this.slideEvents, this);
            this.scoreValue.string = bet.toString();
            return true;
        } else {
            return false;
        }
    }

    changeIncDecOfLevel(sliderProgress: number) {
        if (sliderProgress <= this.minSliderVal) {
            this.allowIncDec(false, true);
        } else if (sliderProgress == 1) {
            this.allowIncDec(true, false);
        } else {
            this.allowIncDec(true, true);
        }
    }

    allowIncDec(dec: boolean, inc: boolean) {
        this.levelValueDec.interactable = dec;
        this.levelValueDec.getComponent(Sprite).grayscale = !dec;
        this.levelValueInc.interactable = inc;
        this.levelValueInc.getComponent(Sprite).grayscale = !inc;
    }

    get Raise(): number {
        return this.raiseAmount;
    }

    set MinRaiseVal(value: number) {
        this.minRaiseValue = value;
    }

    set Active(isActive: boolean) {
        this.TouchRestriction.active = !isActive;
        this.sliderBG.getComponent(Sprite).grayscale = !isActive;
        this.sliderBar.getComponent(Sprite).grayscale = !isActive;
        this.sliderHandle.getComponent(Sprite).grayscale = !isActive;
        // isActive ? this.resetSliderToMin() : this.allowIncDec(isActive, isActive);
    }
}
