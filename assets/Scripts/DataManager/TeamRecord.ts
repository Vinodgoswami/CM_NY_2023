import { _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TeamRecord")
export class TeamRecord {
  private index = 0;
  private teamName = "";
  private member1 = "";
  private member2 = "";
  private score: number[] = [];
  private totalScore: number = null;

  initaliseTeamData(data) {
    this.setIndex = data.id;
    this.setTeamName = data.teamName;
    this.setTeamMember1 = data.member_1;
    this.setTeamMember2 = data.member_2;
    this.setScoreData = data.scores;
  }

  set setIndex(index: number) {
    this.index = index;
  }
  get getIndex(): number {
    return this.index;
  }

  set setTeamName(name) {
    this.teamName = name;
  }
  get getTeamName(): string {
    return this.teamName;
  }

  set setTeamMember1(name) {
    this.member1 = name;
  }
  get getTeamMember1(): string {
    return this.member1;
  }

  set setTeamMember2(name) {
    this.member2 = name;
  }
  get getTeamMember2(): string {
    return this.member2;
  }

  set setScoreData(scoreData) {
    this.score = [...scoreData];
    this.setTotalScore = this.score;
  }
  get getScoreData(): number[] {
    return this.score;
  }
  setScoreAtIndex(index: number, score: number) {
    this.score[index] = score;
    this.setTotalScore = this.score;
  }
  getScoreAtIndex(index: number): number {
    return this.score[index];
  }

  private set setTotalScore(score) {
    this.totalScore = 0;
    score.forEach((element) => {
      this.totalScore = Number(this.totalScore) + Number(element);
    });
  }

  get getTotalScore(): number {
    return this.totalScore;
  }
}
