import useTimer from "../hooks/usePomodoroTimer";
import { countToMinute, countToSecond } from "../lib/timerFuntions";
import { createStateString } from "../util/createStateString";
import { Display } from "react-7-segment-display";
import { TimerForm } from "./TimerForm";
import { Button } from "~/components/ui/button";

export default function Timer() {
    const isSkew = true;
    const {
        timer,
        setTimer,
        startTimer,
        stopTimer,
        resetTimer,
        pomodoroTimesInSecond,
    } = useTimer();
    console.log('timer: ', timer);
    console.log('pomodoroTimerInSecond: ', pomodoroTimesInSecond);
    /**
     * TODO: タイマーストップ時の色が見にくいのでいい感じの色にする。デザイントークン的なものを定義しておきたい
     * DisplayのcolorにはCSSのデフォルトの166色が使えるっぽい
     * @see: https://developer.mozilla.org/ja/docs/Web/CSS/named-color
     * */
    const timerColor = timer.paused ? "white" : timer.pomodoroState === 'focus' ? 'lime' : 'teal'
    const colonColor = timer.paused ? "text-white" : timer.pomodoroState === 'focus' ? 'text-lime-400' : 'text-teal-400'; 
    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-4xl font-bold">pomodoro</div>
            <div className="flex items-center h-[250px]">
                <Display value={countToMinute(timer.count)}  color={timerColor} height={250} skew={isSkew} count={2}/>
                <div className={`text-8xl ${colonColor} text-lime`}>:</div>
                <Display value={countToSecond(timer.count)}  color={timerColor} height={250} skew={isSkew} count={2}/>
            </div>
            {/* TODO: リセット時とストップ時にトーストを表示する */}
            <div>
                {timer.paused ? (
                    <TimerButton onClick={startTimer} text="START" />
                ) : (
                    <TimerButton onClick={stopTimer} text="STOP" />
                )}
            </div>
            <TimerButton onClick={resetTimer} text="RESET" />
            <TimerForm setTimer={setTimer}/>
        </div>
    )
}


function TimerButton(props: {
    onClick: () => void;
    text: string;
}) {
    return (
        <Button
            type="button"
            onClick={props.onClick}
            className="w-[150px] text-3xl p-8 focus-visible:outline-4 focus-visible:outline-seven-segment-green"
        >
            {props.text}
        </Button>
    )
}