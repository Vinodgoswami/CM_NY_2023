import { _decorator, Component, Node, Prefab, instantiate } from "cc";
import { DataHandler } from "../DataManager/DataHandler";
import { TeamRecord } from "../DataManager/TeamRecord";
import { LeaderBoardRank } from "./LeaderBoardRank";
const { ccclass, property } = _decorator;

@ccclass("LeaderBoard")
export class LeaderBoard extends Component {
  @property({ type: Node })
  view: Node = null;

  @property({ type: Prefab })
  remaingRank: Prefab = null;

  @property({ type: Node })
  firstRank: Node = null;

  @property({ type: Node })
  secondRank: Node = null;

  @property({ type: Node })
  thirdRank: Node = null;

  teamRecord: TeamRecord[] = null;
  leaderBoardRecord: Node[] = null;

  maxScore: number = 5;
  currentRank: number = 1;
  repeatCount: number = 1;
  onLoad() {
    this.refreshRecords();
    this.addLeaderBoard();
  }

  refreshRecords() {
    this.teamRecord = null;
    this.maxScore = 5;
    this.teamRecord = [...DataHandler.getInstance().getTeamRecords()];
    this.teamRecord.sort((record1, record2) => {
      return record2.getTotalScore - record1.getTotalScore;
    });
  }

  addLeaderBoard() {
    this.leaderBoardRecord = [];
    this.setFirstThreeRank();
    for (let index = 3; index < this.teamRecord.length; index++) {
      let leaderboard = instantiate(this.remaingRank);
      this.view.addChild(leaderboard);
      leaderboard.getComponent(LeaderBoardRank).updateStats(this.teamRecord[index], index + 1);
      this.leaderBoardRecord.push(leaderboard);
    }
  }

  setFirstThreeRank() {
    this.firstRank.getComponent(LeaderBoardRank).updateStats(this.teamRecord[0], 1);
    this.leaderBoardRecord[0] = this.firstRank;

    this.secondRank.getComponent(LeaderBoardRank).updateStats(this.teamRecord[1], 2);
    this.leaderBoardRecord[1] = this.secondRank;

    this.thirdRank.getComponent(LeaderBoardRank).updateStats(this.teamRecord[2], 3);
    this.leaderBoardRecord[2] = this.thirdRank;
  }

  getRankForTeam(score): number {
    if (score < this.maxScore) {
      this.maxScore = score;
      this.currentRank = this.repeatCount;
    }
    this.repeatCount++;
    return this.currentRank;
  }

  reloadLeaderBoard() {
    this.initialiseVariable();
    var needToDoSplit = true;
    this.refreshRecords();
    for (let index = 0; index < this.teamRecord.length; index++) {
      let rank = this.getRankForTeam(this.teamRecord[index].getTotalScore);
      let record = this.leaderBoardRecord[index];
      record.getComponent(LeaderBoardRank).updateStats(this.teamRecord[index], rank, needToDoSplit);
      needToDoSplit = false;
    }
  }

  initialiseVariable() {
    this.currentRank = 1;
    this.maxScore = 5;
    this.repeatCount = 1;
  }
}
