// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html

import { Component, log, warn, _decorator } from "cc";

//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
class msgItem {
  callback: Function = null;
  object: Node | object = null;
}

const { ccclass, property } = _decorator;

@ccclass
export class MessageCenter extends Component {
  private _Que: any = null;

  private static instance: MessageCenter;

  public static getInstance(): MessageCenter {
    if (!this.instance) {
      this.instance = new MessageCenter();
    }
    return this.instance;
  }

  /**
   * 注册消息
   * @param msg 消息名称
   * @param callback 回调函数
   * @param object 注册消息的对象
   */
  public register(msg: string, callback: Function, object: Node | object) {
    if (!object || (!(object instanceof Node) && typeof object !== "object")) {
      warn("Please pass in the correct registered object");
      return;
    }
    if (this._Que === null) {
      this._Que = {};
    }
    if (!this._Que[msg]) {
      this._Que[msg] = [];
    }

    if (this.isObjectHasRegister(msg, object)) {
      warn("The object has already been registered for the message： " + msg);
      return;
    }
    //cc.log("Add registration msg = " + msg);
    let item: msgItem = new msgItem();
    item.callback = callback;
    item.object = object;

    this._Que[msg].push(item);
  }

  /**
   *判断当前对象是否已注册过该消息
   * @param msg 消息名称
   * @param object 消息对象节点
   */
  private isObjectHasRegister(msg: string, object: Node | object) {
    let item: msgItem[] = this._Que[msg];
    let len = item.length;
    for (let i = len - 1; i >= 0; i--) {
      if (item[i].object === object) {
        return true;
      }
    }
    return false;
  }

  /**
   * 移除对象消息
   * @param msg 移除消息名称
   * @param object 移除消息对象节点
   */
  public unregister(msg: string, object: Node | object) {
    if (this._Que === null) {
      console.log("_Que未初始化");
      return;
    }
    if (!this._Que[msg]) {
      console.log("未注册该消息" + msg);
      return;
    }
    let item: msgItem[] = this._Que[msg];
    let len = item.length;

    for (let i = len - 1; i >= 0; i--) {
      if (item[i].object === object) {
        item.splice(i, 1);
        break;
      }
    }
  }

  /**
   *
   * @param msg 发送消息名称
   * @param params
   */
  public send(msg: string, params: any = null) {
    if (this._Que === null) {
      log("_Que Uninitialized/Empty");
      return;
    }
    if (!this._Que[msg]) {
      log("Message not registered: " + msg);
      return;
    }
    let callbacks = this._Que[msg];
    let len = callbacks.length;
    log("send ===> " + msg + ",Number：" + len);
    for (let i = len - 1; i >= 0; i--) {
      callbacks[i].callback(params);
    }
  }
}
