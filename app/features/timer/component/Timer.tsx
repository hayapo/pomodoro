import usePomodoroTimer from "../hooks/usePomodoroTimer";
import { countToMinute, countToSecond } from "../lib/timerFuntions";
import { createStateString } from "../util/createStateString";
import { Display } from "react-7-segment-display";

export default function Timer() {
    const isSkew = true;
    const {
        count,
        timerState,
        pomodoroState,
        startTimer,
        stopTimer,
        resetTimer
    } = usePomodoroTimer();
    const pomodoroString = createStateString(timerState, pomodoroState);
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-4xl fontt-bold">{pomodoroString}</div>
            <div className="flex items-center">
                <Display value={countToMinute(count)}  color="green" height={250} skew={isSkew} count={2}/>
                <div className="text-8xl text-seven-segment-green">:</div>
                <Display value={countToSecond(count)}  color="green" height={250} skew={isSkew} count={2}/>
            </div>
            <div className="flex gap-5">
                {timerState === "started" ? (
                    <TimerStopButton onClick={stopTimer}/>
                ) : (
                    <TimerStartButton onClick={startTimer} />
                )}
                <button
                    type="button"
                    onClick={resetTimer}
                    className="text-3xl"
                    >
                    reset
                </button>
            </div>
        </div>
    )
}

function TimerStartButton(props: { onClick: () => void}) {
    return (
        <button
        type="button"
        onClick={props.onClick}
        className="text-3xl"
        >
        start
    </button>
    )
}

function TimerStopButton(props: { onClick: () => void}) {
    return (
        <button
        type="button"
        onClick={props.onClick}
        className="text-3xl"
        >
        stop
    </button>
    )
}