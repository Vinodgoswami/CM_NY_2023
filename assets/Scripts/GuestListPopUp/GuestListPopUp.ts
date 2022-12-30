import { _decorator, Component, Node, Prefab, Vec3, ScrollView, instantiate, JsonAsset, UITransform, sys } from "cc";
const { ccclass, property } = _decorator;
import { GuestListMember } from "./GuestListMember";
import { DataHandler } from "../DataManager/DataHandler";
import { MessageCenter } from "../Common/MessageCenter";
import { CALL_BACK_EVENTS } from "../Common/Costant";
import { AddTeamPopUp } from "../AddTeamPopUpScript/AddTeamPopUp";
import { TeamRecord } from "../DataManager/TeamRecord";
@ccclass("GuestListPopUp")
export class GuestListPopUp extends Component {
  @property({ type: Prefab })
  guestMemberPrefab: Prefab = null;

  @property({ type: Prefab })
  addteampopUpPrefab: Prefab = null;

  @property({ type: Node }) container: Node = null;
  guestPanelLists: Node[] = [];

  teamPopup: Node = null;
  localData: TeamRecord[] = null;

  onLoad() {
    this.addCustomEvents();
  }
  addCustomEvents() {
    MessageCenter.getInstance().register(CALL_BACK_EVENTS.GUEST_POPUP_CLOSE_EVENT, this.popupCloseEvent.bind(this), this.node);
    MessageCenter.getInstance().register(CALL_BACK_EVENTS.GUEST_MEMBER_CLICKED, this.openAddGuestDetailPopup.bind(this), this.node);

    this.refreshData();
    this.guestListPanel();
    this.instantiatePopup();
  }

  refreshData() {
    this.localData = [...DataHandler.getInstance().getTeamRecords()];
  }

  instantiatePopup() {
    this.teamPopup = instantiate(this.addteampopUpPrefab);
  }

  guestListPanel() {
    for (let index = 0; index < this.localData.length; index++) {
      let guestPanel = instantiate(this.guestMemberPrefab);
      guestPanel.getComponent(GuestListMember).updateMembersRecord(this.localData[index]);
      this.container.addChild(guestPanel);
      this.guestPanelLists.push(guestPanel);
    }
  }

  updateViewAtIndex(index: number) {
    let record: Node = this.guestPanelLists[index];
    record.getComponent(GuestListMember).updateMembersRecord(this.localData[index]);
    this.guestPanelLists[index] = record;
  }

  popupCloseEvent(dataReceived) {
    let record: TeamRecord = dataReceived;
    let data = { teamName: record.getTeamName, member_1: record.getTeamMember1, member_2: record.getTeamMember2, scores: record.getScoreData };
    DataHandler.getInstance().updateRecordAtIndex(record.getIndex, data);
    this.updateViewAtIndex(record.getIndex);
  }

  openAddGuestDetailPopup(data) {
    this.node.addChild(this.teamPopup);
    this.teamPopup.getComponent(AddTeamPopUp).updatePopupData(this.localData[data]);
  }

  removeCustomEvents() {
    MessageCenter.getInstance().unregister(CALL_BACK_EVENTS.GUEST_POPUP_CLOSE_EVENT, this.node);
    MessageCenter.getInstance().unregister(CALL_BACK_EVENTS.GUEST_MEMBER_CLICKED, this.node);
  }
  onDestroy() {
    this.removeCustomEvents();
  }
}
