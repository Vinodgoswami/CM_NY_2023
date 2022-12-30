import { _decorator, Component, Node, Label, Prefab, instantiate, Vec3, sys } from "cc";
import { GameScore } from "../../Components/GameScore/GameScore";
import { CALL_BACK_EVENTS } from "../Common/Costant";
import { MessageCenter } from "../Common/MessageCenter";
import { TeamData } from "../Common/TeamData";
import { TeamRecord } from "../DataManager/TeamRecord";
const { ccclass, property } = _decorator;

@ccclass("ScoreBoardMember")
export class ScoreBoardMember extends Component {
  @property({ type: Label })
  totalScoreLabel: Label = null;

  @property({ type: Label })
  teamName: Label = null;

  @property({ type: Label })
  teamMember: Label = null;

  @property({ type: Label })
  index: Label = null;

  @property(Prefab)
  scoreCard: Prefab = null;

  teamId: number = -1;

  @property(Node)
  gameScoreLayout: Node = null;

  scores = [];
  scoreBoxes: Node[] = [];
  id: number = -1;
  start() {}

  updateRecord(record: TeamRecord) {
    this.id = record.getIndex;
    this.index.string = (record.getIndex + 1).toString();
    this.totalScoreLabel.string = record.getTotalScore.toString();
    this.teamName.string = record.getTeamName;
    this.teamMember.string = record.getTeamMember1 + " / " + record.getTeamMember2;
    this.scores = record.getScoreData;
    this.updateBoxes();
  }

  updateBoxes() {
    for (let index = 0; index < this.gameScoreLayout.children.length; index++) {
      let child = this.gameScoreLayout.getChildByName("GameScore_" + index);
      child.getChildByName("Score").getComponent(Label).string = this.scores[index];
    }
  }

  scoreBtnClick(event, customEventData) {
    let data = { id: this.id, scoreIndex: Number(customEventData) };
    MessageCenter.getInstance().send(CALL_BACK_EVENTS.SCORE_BUTTON_CLICKED, data);
  }
}
