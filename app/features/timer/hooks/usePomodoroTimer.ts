import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { focusTimeAtom, timerCountAtom, timerStateAtom } from "~/atom/atoms";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import { usePomodoro } from "~/features/pomodoro/hooks/usePomodoro";

export default function usePomodoroTimer() {
    const {
        pomodoroState,
        setPomodoroState,
        startNextPomodoro,
    } = usePomodoro();
    const [timerState, setTimerState] = useAtom(timerStateAtom);
    const setFocusTime = useSetAtom(focusTimeAtom);
    const [timer, setTimer] = useAtom(timerCountAtom);

    useEffect(() => {
        if (timerState === "started") {
            const id = setInterval(() => {
                if (timer === 0) {
                    console.log("finished");
                    startNextPomodoro();
                    return;
                }
                setTimer((prev) => prev - 1)
            }, 1000);
            return () =>  clearInterval(id);
        }
    }, [timerState, startNextPomodoro, timer, setTimer]);
    
    function startTimer() {
        setTimerState("started");
        setPomodoroState("focus");
    }

    function stopTimer() {
        setTimerState("stopped");
    }

    function resetTimer() {
        setTimerState("notStarted");
        if (pomodoroState === "focus") {
            setPomodoroState("focus");
            setFocusTime(DEFAULT_FOCUS_TIMER_MINUTE);
        } else {
            setPomodoroState("rest");
            setFocusTime(DEFAULT_REST_TIMER_MINUTE);
        }
    }

    return {
        timer,
        timerState,
        pomodoroState,
        setPomodoroState,
        startTimer,
        stopTimer,
        resetTimer,
    }
}