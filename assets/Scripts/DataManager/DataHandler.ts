import { _decorator, Component, Node, resources, JsonAsset } from "cc";
import { TeamRecord } from "./TeamRecord";
const { ccclass, property } = _decorator;

@ccclass("DataHandler")
export class DataHandler {
  private static dataHandler: DataHandler = null;
  private teamsRecord: TeamRecord[] = [];
  private teamData = [];
  private totalRecord = 46;
  public static getInstance(): DataHandler {
    if (!this.dataHandler) {
      this.dataHandler = new DataHandler();
    }
    return this.dataHandler;
  }

  popuplateData(jsonReceived: JsonAsset) {
    let isDataStored = DataHandler.getInstance().checkIfDataStoredLocally();
    if (isDataStored) {
      this.fetchLocalStorageData();
    } else {
      this.teamData = [...jsonReceived.json.data];
      this.storeRecordLocally();
    }
    this.createTeamRecordData();
  }

  createTeamRecordData() {
    this.teamsRecord = [];
    for (let index = 0; index < this.teamData.length; index++) {
      let data = this.teamData[index];
      if (data) {
        data.id = index;
        let teamRecord = new TeamRecord();
        teamRecord.initaliseTeamData(data);
        this.teamsRecord.push(teamRecord);
      }
    }
  }

  checkIfDataStoredLocally(): boolean {
    let data = localStorage.getItem("IS_DATA_STORED_LOCALLY");
    if (data == null) return false;
    return true;
  }

  setDataStoreStatusLocally(status: boolean) {
    localStorage.setItem("IS_DATA_STORED_LOCALLY", JSON.stringify(status));
  }

  storeRecordLocally() {
    let teamName = "Team_";
    for (let index = 0; index < this.teamData.length; index++) {
      let key = teamName + index;
      localStorage.setItem(key, JSON.stringify(this.teamData[index]));
    }
    this.setDataStoreStatusLocally(true);
  }

  fetchLocalStorageData() {
    let teamName = "Team_";
    for (let index = 0; index < this.totalRecord; index++) {
      let key = teamName + index;
      let teamData = JSON.parse(localStorage.getItem(key));
      this.teamData.push(teamData);
    }
  }

  updateRecordAtIndex(index: number, updateRecord) {
    let key = "Team_" + index;
    // console.log("Old Record: ", localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(updateRecord));
    // console.log("New Record: ", localStorage.getItem(key));

    // console.log("Old Team Record: ", this.teamData[index]);
    // console.log("Updated Record: ", updateRecord);

    this.teamData[index] = updateRecord;
    // console.log("Record New Record: ", this.teamData[index]);

    updateRecord["id"] = index;
    let teamRecord = this.teamsRecord[index];
    teamRecord.initaliseTeamData(updateRecord);
    this.teamsRecord[index] = teamRecord;
  }

  getTeamRecordAtIndex(index: number) {
    return this.teamsRecord[index];
  }

  getTeamRecords(): TeamRecord[] {
    return this.teamsRecord;
  }
}
