import usePomodoroTimer from "../hooks/usePomodoroTimer";
import { countToMinute, countToSecond } from "../lib/timerFuntions";
import { createStateString } from "../util/createStateString";
import { Display } from "react-7-segment-display";
import { TimerForm } from "./TimerForm";

export default function Timer() {
    const isSkew = true;
    const {
        timer,
        timerState,
        pomodoroState,
        startTimer,
        stopTimer,
        resetTimer
    } = usePomodoroTimer();
    const pomodoroString = createStateString(timerState, pomodoroState);
    // TODO: タイマーストップ時の色が見にくいのでいい感じの色にする
    const timerColor = timerState === "stopped" ? "white" : "green";
    const colonColor = timerState === "stopped" ? "text-white" :  "text-seven-segment-green"; 
    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="text-4xl font-bold">{pomodoroString}</div>
            <div className="flex items-center h-[250px]">
                <Display value={countToMinute(timer)}  color={timerColor} height={250} skew={isSkew} count={2}/>
                <div className={`text-8xl ${colonColor}`}>:</div>
                <Display value={countToSecond(timer)}  color={timerColor} height={250} skew={isSkew} count={2}/>
            </div>
            <div>
                {timerState === "started" ? (
                    <TimerButton onClick={stopTimer} text="STOP" />
                ) : (
                    <TimerButton onClick={startTimer} text="START" />
                )}
            </div>
            <TimerButton onClick={resetTimer} text="RESET" />
            <TimerForm />
        </div>
    )
}

function TimerButton(props: {
    onClick: () => void;
    text: string;
}) {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className="text-3xl font-bold"
        >
            {props.text}
        </button>
    )
}