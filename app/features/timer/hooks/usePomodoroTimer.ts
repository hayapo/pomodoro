import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { focusTimeAtom, pomodoroStateAtom, restTimeAtom, timerAtom, timerStateAtom } from "~/atom/atoms";

export default function usePomodoroTimer() {
    const [timerState, setTimerState] = useAtom(timerStateAtom);
    const [pomodoroState, setPomodoroState] = useAtom(pomodoroStateAtom);
    const [focusTime, setFocusTime] = useAtom(focusTimeAtom);
    const [restTime, setRestTime] = useAtom(restTimeAtom);
    const [timer, setTimer] = useAtom(timerAtom);
    const [initialTime] = useState(Date.now);

    const startNextPomodoro = useCallback(() => {
        // 次の pomodoroState に遷移し、遷移先のpomodoroStateに応じた時間でタイマーをセット
        // TODO: 次のポモドーロでもカスタムしたタイマー時間をセットするようにする
        if (pomodoroState === "focus") {
            setPomodoroState("rest");
            setTimer(restTime);
            // setFocusTime(DEFAULT_REST_TIMER_MINUTE);
        } else {
            setPomodoroState("focus");
            setTimer(focusTime);
            // setFocusTime(DEFAULT_FOCUS_TIMER_MINUTE);
        }
    }, [pomodoroState, focusTime, restTime, setPomodoroState, setTimer])

    useEffect(() => {
        if (timerState === "notStarted" || timerState === "stopped") {
            return;
        }
        const now = Date.now();
        let nextTime = now + 1000 - ((now - initialTime) % 1000);
        const loop = () => {
            setTimer((c) => c - 1);
            const now = Date.now();
            nextTime = now + 1000 - ((nextTime - now) % 1000);
            const diff = nextTime - now;    
            timerId = setTimeout(loop, diff);
        };
        const diff = nextTime - now;
        let timerId = setTimeout(loop, diff);
        return () => {
            clearTimeout(timerId);
        };
    }, [timerState, initialTime]);
    
    function startTimer() {
        // if (timerState === "notStarted") {
        //         switch (pomodoroState) {
        //         case "focus":
        //             setPomodoroState("focus");
        //             setTimer(focusTimeMinute);
        //             break;
        //         case "rest":
        //             setPomodoroState("rest");
        //             setTimer(restTimeMinute);
        //             break;
        //     }
        // }
        setTimerState("started");
    }

    function stopTimer() {
        setTimerState("stopped");
    }

    function resetTimer() {
        setTimerState("notStarted");
        if (pomodoroState === "focus") {
            setPomodoroState("focus");
            setTimer(focusTime);
        } else {
            setPomodoroState("rest");
            setTimer(restTime);
        }
    }

    return {
        timer,
        timerState,
        pomodoroState,
        setPomodoroState,
        setFocusTime,
        setRestTime,
        startTimer,
        stopTimer,
        resetTimer,
    }
}