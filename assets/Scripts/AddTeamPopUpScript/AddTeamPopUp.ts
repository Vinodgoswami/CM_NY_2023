import { _decorator, Component, Label, EditBox } from "cc";
import { TeamRecord } from "../DataManager/TeamRecord";
import { MessageCenter } from "../Common/MessageCenter";
import { CALL_BACK_EVENTS } from "../Common/Costant";
const { ccclass, property } = _decorator;

@ccclass("AddTeamPopUp")
export class AddTeamPopUp extends Component {
  @property({ type: Label })
  teamNameLabel: Label = null;

  @property({ type: EditBox })
  editBox1: EditBox = null;

  @property({ type: EditBox })
  editBox2: EditBox = null;

  @property({ type: Label })
  title1: Label = null;

  @property({ type: Label })
  title2: Label = null;

  record: TeamRecord = null;
  start() {}

  updatePopupData(record: TeamRecord) {
    if (record.getTeamMember1 != "Name") this.editBox1.string = record.getTeamMember1;

    if (record.getTeamMember2 != "Name") this.editBox2.string = record.getTeamMember2;

    this.record = record;
    this.teamNameLabel.string = record.getTeamName;
    let teamNameSplit = record.getTeamName.split("&");
    this.title1.string = teamNameSplit[0];
    this.title2.string = teamNameSplit[1];
  }

  submitBtnCB(event, customCB) {
    if (this.editBox1.string.length > 0) {
      this.record.setTeamMember1 = this.editBox1.string;
    }

    if (this.editBox2.string.length > 0) {
      this.record.setTeamMember2 = this.editBox2.string;
    }

    MessageCenter.getInstance().send(CALL_BACK_EVENTS.GUEST_POPUP_CLOSE_EVENT, this.record);
    this.removeAndReset();
  }

  cancelBtnCB(event, customCB) {
    this.removeAndReset();
  }

  removeAndReset() {
    this.editBox1.string = "";
    this.editBox2.string = "";
    this.node.removeFromParent();
  }
}
