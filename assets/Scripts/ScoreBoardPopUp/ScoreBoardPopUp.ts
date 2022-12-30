import { _decorator, Component, Node, Prefab, instantiate } from "cc";
import { ScoreBoardMember } from "./ScoreBoardMember";
import { TeamRecord } from "../DataManager/TeamRecord";
import { DataHandler } from "../DataManager/DataHandler";
import { MessageCenter } from "../Common/MessageCenter";
import { CALL_BACK_EVENTS } from "../Common/Costant";
const { ccclass, property } = _decorator;

@ccclass("ScoreBoardPopUp")
export class ScoreBoardPopUp extends Component {
  @property({ type: Node })
  container: Node = null;

  @property(Prefab)
  scoreTeamMemPrefab: Prefab = null!;

  @property(Prefab)
  teamDataPopUp: Prefab = null;

  recordsContainer: Node[] = [];

  records: TeamRecord[] = null;

  scorePopup: Node = null;
  currentSelectedRecordIndex = -1;
  scoreSelectedIndex = -1;

  onLoad() {
    this.registerEvents();
    this.refreshRecords();
    this.scoreBoardPanel();
    this.initatePopup();
  }

  registerEvents() {
    MessageCenter.getInstance().register(CALL_BACK_EVENTS.SCORE_BUTTON_CLICKED, this.scorePopupCalled.bind(this), this.node);
  }

  initatePopup() {
    this.scorePopup = instantiate(this.teamDataPopUp);
  }

  scoreBoardPanel() {
    this.recordsContainer = [];
    for (let index = 0; index < this.records.length; index++) {
      let scorePanel = instantiate(this.scoreTeamMemPrefab);
      scorePanel.name = "Team_" + index;
      this.container.addChild(scorePanel);
      this.recordsContainer.push(scorePanel);
      scorePanel.getComponent(ScoreBoardMember).updateRecord(this.records[index]);
    }
  }

  refreshRecords() {
    this.records = [];
    this.records = [...DataHandler.getInstance().getTeamRecords()];
  }

  scorePopupCalled(data) {
    this.currentSelectedRecordIndex = data.id;
    this.scoreSelectedIndex = data.scoreIndex;
    let record = this.records[this.currentSelectedRecordIndex];
    var score = record.getScoreAtIndex(this.scoreSelectedIndex);
    console.log("Score: Recieved: ", score);
    score++;
    score = score % 2;
    this.scoreInfo(score);

    // this.node.addChild(this.scorePopup);
    // this.scorePopup.getComponent(PopUp).showPopUp("Enter Score", this.scoreInfo.bind(this), 0);
  }

  scoreInfo(score) {
    let record = this.records[this.currentSelectedRecordIndex];
    record.setScoreAtIndex(this.scoreSelectedIndex, score);
    let data = { teamName: record.getTeamName, member_1: record.getTeamMember1, member_2: record.getTeamMember2, scores: record.getScoreData };
    DataHandler.getInstance().updateRecordAtIndex(this.currentSelectedRecordIndex, data);
    this.updateView();
  }

  updateView() {
    this.refreshRecords();
    let child = this.container.getChildByName("Team_" + this.currentSelectedRecordIndex);
    child.getComponent(ScoreBoardMember).updateRecord(this.records[this.currentSelectedRecordIndex]);
  }

  updateScrollView() {
    this.refreshRecords();
    for (let index = 0; index < this.records.length; index++) {
      let name = "Team_" + index;
      let child = this.container.getChildByName(name);
      child.getComponent(ScoreBoardMember).updateRecord(this.records[index]);
    }
  }
  unregisterEvents() {
    MessageCenter.getInstance().unregister(CALL_BACK_EVENTS.SCORE_BUTTON_CLICKED, this.node);
  }
  onDestroy() {
    this.unregisterEvents();
  }
}
