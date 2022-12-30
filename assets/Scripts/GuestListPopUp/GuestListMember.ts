import { _decorator, Component, Node, Label, Prefab, instantiate, UITransform } from "cc";
import { CALL_BACK_EVENTS } from "../Common/Costant";
import { MessageCenter } from "../Common/MessageCenter";
import { TeamRecord } from "../DataManager/TeamRecord";
const { ccclass, property } = _decorator;

@ccclass("GuestListMember")
export class GuestListMember extends Component {
  @property({ type: Label })
  teamId: Label = null;
  @property({ type: Label })
  teamName: Label = null;
  @property({ type: Label })
  teamMember: Label = null;

  tId: number = -1;
  updateMembersRecord(record: TeamRecord) {
    this.teamName.string = record.getTeamName;
    this.teamMember.string = record.getTeamMember1 + "/" + record.getTeamMember2;
    this.tId = record.getIndex;
    this.teamId.string = (record.getIndex + 1).toString();
  }

  recordClickCB(event, customEventData) {
    MessageCenter.getInstance().send(CALL_BACK_EVENTS.GUEST_MEMBER_CLICKED, this.tId);
  }
}
