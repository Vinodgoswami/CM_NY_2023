import { _decorator, Component, Node, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameScore")
export class GameScore extends Component {
    @property({ type: Label })
    gameName: Label = null;
    @property({ type: Label })
    gameScore: Label = null;
    nameReturn: Function = null;
    gameNameLabel: string;
    start() {}

    set GameNameLabel(value: string) {
        this.gameName.string = value;
    }

    get GameName(): string {
        return this.gameName.string;
    }
    namecallBack = (func: Function) => {
        this.nameReturn = func;
    };
    gameSelectedEvent(event: any) {
        if (event) {
            this.nameReturn(this.node);
        }
    }
    set Score(score: string) {
        // this.gameName.string = this.node.name;
        this.gameScore.string = score;
    }

    get Score(): string {
        return this.gameScore.string;
    }

    update(deltaTime: number) {}
}
