import { _decorator, Component, Node, Label, EditBox } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AddTeamMember")
export class AddTeamMember extends Component {
    memberData: { index?: number; name?: string } = {};
    @property({type:Label})
    memberNumber:Label=null;
    @property({type:EditBox})
    nameEditBox:EditBox=null;
    
    start() {}

    
    nameSelectedEvent(event: any, customEventData: any) {
        this.memberData.name = this.nameEditBox.string;
    }

    set Index(value: number) {
        this.memberData.index = value;
        this.memberNumber.string=`Member Number ${value}`
    }

    get MemberData(): { index?: number; name?: string } {
        this.memberData.name =this.nameEditBox.string;
        
        //console.log(this.memberData.name ,this.nameEditBox.string);
        
        return this.memberData;
    }

    update(deltaTime: number) {}
}
