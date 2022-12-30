import { _decorator, Component, Label, macro, tween, Tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

/**
 * @title Timer class
 * @author harpinder_singh
 * @notice this class manages the timer in minutes and seconds only.
 */
@ccclass("Timer")
export class Timer extends Component {
    @property(Label) timeLeft: Label = null!;
    @property(Label) message: Label = null!;

    callbackFromParent: Function = () => {};
    seconds: number;
    secondsLeft: number = -1;
    minutes: number;

    start() {}
    onLoad() {
        this.node.active = false;
    }

    /**
     * @en
     * Use startTimer to start the timer,
     * It will end automatically and calls callback function on time over
     * @param seconds  The timer start time
     * @param func  The callback function of the task
     */
    runTimer(data: { date: string; time: number; msg: string }, func: Function) {
        // if (this.secondsLeft != -1) {
        //     return;
        // }

        //console.log(data);

        this.timeOver();

        var currentTime = new Date();
        var stopTime = new Date(data.date);
        let TimeLeft = (Date.parse(stopTime.toString()) - Date.parse(currentTime.toString())) / 1000;
        if (TimeLeft > data.time) {
            TimeLeft = data.time;
        }

        this.node.active = true;
        this.callbackFromParent = func;
        //console.log("TIME LEFT : ", TimeLeft);

        this.secondsLeft = TimeLeft;
        this.timer();
        this.schedule(this.timer, 1, macro.REPEAT_FOREVER, 0);
        this.message.string = data.msg;
        // this.startMessageBouce();
    }

    startMessageBouce() {
        tween(this.message.node)
            .by(0.5, { position: new Vec3(0, 30, 0) }, { easing: "quartIn" })
            .by(0.5, { position: new Vec3(0, -30, 0) }, { easing: "quartOut" })
            .union()
            .repeat(macro.REPEAT_FOREVER)
            .start();
    }

    stopMessageBounce() {
        Tween.stopAllByTarget(this.message.node);
    }

    timer() {
        if (this.secondsLeft >= 0) {
            this.updateTimerCountDown();
            this.secondsLeft--;
        } else if (this.secondsLeft <= -1) {
            this.timeOver();
        }
    }

    stopTimer() {
        this.secondsLeft = -1;
    }

    pauseTimer() {}

    resumeTimer() {}

    timeOver() {
        this.stopTimer();
        this.unschedule(this.timer);
        this.node.active = false;
        this.callbackFromParent();
    }

    updateTimerCountDown() {
        this.seconds = this.secondsLeft % 60;
        this.minutes = Math.floor(this.secondsLeft / 60);

        let min = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        let sec = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        this.timeLeft.string = min + ":" + sec;
    }
}
