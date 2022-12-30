import { _decorator, Component, Node, Label, RichText } from "cc";
import { TeamRecord } from "../DataManager/TeamRecord";
const { ccclass, property } = _decorator;

@ccclass("LeaderBoardRank")
export class LeaderBoardRank extends Component {
  @property({ type: Label })
  teamName: Label = null;

  @property({ type: Label })
  separater: Label = null;

  @property({ type: Label })
  teamName2: Label = null;

  @property({ type: Label })
  score: Label = null;

  @property({ type: Label })
  rank: Label = null;

  updateStats(record: TeamRecord, rank: number, needToDoSplit = false) {
    var name = record.getTeamName;
    if (needToDoSplit) {
      let splitText = record.getTeamName.split(" ");
      name = splitText[0];
      this.teamName2.string = splitText[2];
    }
    this.teamName.string = name;
    this.rank.string = rank.toString();
    this.score.string = record.getTotalScore.toString();
  }

  changeRank(rank: number) {
    this.rank.string = rank.toString();
  }
}
