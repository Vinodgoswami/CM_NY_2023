import { _decorator, Node, Prefab, instantiate, Component, UITransform, Sprite, SpriteFrame, Button, sys, Animation, JsonAsset, tween, Vec3 } from "cc";
import { BUTTON_TYPE } from "../Common/Costant";
import { DataHandler } from "../DataManager/DataHandler";
import { LeaderBoard } from "../LeaderBoard/LeaderBoard";
import { ScoreBoardPopUp } from "../ScoreBoardPopUp/ScoreBoardPopUp";

const { ccclass, property } = _decorator;

@ccclass("Loading")
export class Loading extends Component {
  @property({
    type: SpriteFrame,
  })
  logo2022 = null!;
  @property({
    type: SpriteFrame,
  })
  logo2023 = null!;
  @property({ type: Node })
  logo: Node = null;

  @property({ type: Sprite })
  guestListButton: Sprite = null;

  @property({ type: Sprite })
  leaderBoardButton: Sprite = null;

  @property({ type: Sprite })
  scoreBoardButton: Sprite = null;

  @property({ type: Node })
  particleNode: Node = null;

  @property({ type: Prefab })
  guestListPrefab: Prefab = null;

  @property({ type: Prefab })
  leaderBoardPrefab: Prefab = null;
  @property({ type: Prefab })
  scoreBoardPrefab: Prefab = null;

  @property({ type: SpriteFrame })
  onButtonSprite: SpriteFrame = null;
  @property({ type: SpriteFrame })
  ofButtonSprite: SpriteFrame = null;

  openedTab: BUTTON_TYPE = BUTTON_TYPE.NONE;

  @property({ type: JsonAsset })
  teamName: JsonAsset = null;

  @property({ type: Node })
  panelContainer: Node = null;

  @property({ type: Node })
  introImage: Node = null;

  guestList: Node = null;
  leaderBoard: Node = null;
  scoreBoard: Node = null;

  start() {
    DataHandler.getInstance().popuplateData(this.teamName);
    this.createPrefab();
    this.logoAnimation();
    this.runFullScreenAnimation();
  }
  runFullScreenAnimation() {
    setInterval(() => {
      this.particleNode.active = true;
      let animation = this.particleNode.getComponent(Animation);
      animation.play();
      animation.on(
        Animation.EventType.FINISHED,
        () => {
          this.particleNode.active = false;
        },
        this,
        true
      );
    }, 20000);
  }
  logoAnimation() {
    var logo2022: boolean = false;
    setInterval(() => {
      tween(this.logo)
        .to(0.5, { scale: new Vec3(0, 1.5, 1) })
        .call(() => {
          if (logo2022) {
            this.logo.getComponent(Sprite).spriteFrame = this.logo2023;
            logo2022 = false;
          } else {
            logo2022 = true;
            this.logo.getComponent(Sprite).spriteFrame = this.logo2022;
          }
        })
        .to(0.5, { scale: new Vec3(1.5, 1.5, 1) })
        .start();
    }, 5000);
  }

  createPrefab() {
    this.openedTab = BUTTON_TYPE.SHOW_REGISTER_PANEl;
    //guestList
    this.guestList = instantiate(this.guestListPrefab);
    this.panelContainer.addChild(this.guestList);

    //Leaderboard

    this.leaderBoard = instantiate(this.leaderBoardPrefab);
    this.panelContainer.addChild(this.leaderBoard);

    //ScoreBoard
    this.scoreBoard = instantiate(this.scoreBoardPrefab);
    this.panelContainer.addChild(this.scoreBoard);

    this.changePanelsVisibility();
  }

  debugCallBacks(event: any, customEventData: any) {
    this.openedTab = Number(customEventData);
    this.changePanelsVisibility();
  }

  changePanelsVisibility() {
    this.hideAllTab();
    this.ofAllNavBarSprite();

    switch (this.openedTab) {
      case BUTTON_TYPE.SHOW_REGISTER_PANEl:
        this.guestListButton.spriteFrame = this.onButtonSprite;
        this.guestList.active = true;
        break;
      case BUTTON_TYPE.SHOW_LEADER_BOARD:
        this.leaderBoardButton.spriteFrame = this.onButtonSprite;
        this.leaderBoard.active = true;
        this.leaderBoard.getComponent(LeaderBoard).reloadLeaderBoard();
        break;
      case BUTTON_TYPE.SHOW_SCORE_BOARD:
        this.scoreBoardButton.spriteFrame = this.onButtonSprite;
        this.scoreBoard.getComponent(ScoreBoardPopUp).updateScrollView();
        this.scoreBoard.active = true;
        break;
    }
  }

  hideAllTab() {
    this.leaderBoard.active = false;
    this.guestList.active = false;
    this.scoreBoard.active = false;
  }

  ofAllNavBarSprite() {
    this.leaderBoardButton.spriteFrame = this.ofButtonSprite;
    this.guestListButton.spriteFrame = this.ofButtonSprite;
    this.scoreBoardButton.spriteFrame = this.ofButtonSprite;
  }

  openIntroImg(event, customEventData) {
    this.introImage.active = true;
  }

  onIntroImgClick(event, customEventData) {
    this.introImage.active = false;
  }
}
