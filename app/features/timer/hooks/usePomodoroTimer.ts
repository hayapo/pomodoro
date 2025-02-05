import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { countAtom, pomodoroAtom, timerAtom } from "~/atom/atoms";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import { usePomodoro } from "~/features/pomodoro/hooks/usePomodoro";

export default function usePomodoroTimer() {
    // const [pomodoroState, setPomodoroState] = useAtom(pomodoroAtom);
    const {
        pomodoroState,
        setPomodoroState,
        startNextPomodoro,
    } = usePomodoro();
    const [count, setCount] = useAtom(countAtom);
    const [timerState, setTimerState] = useAtom(timerAtom);

    useEffect(() => {
        if (timerState === "started") {
            const id = setInterval(() => {
                if (count === 0) {
                    console.log("finished");
                    startNextPomodoro();
                    return;
                }
                setCount((prev) => prev - 1)
            }, 1000);
            return () =>  clearInterval(id);
        }
    }, [count, timerState, startNextPomodoro, setCount]);
    
    function startTimer() {
        setTimerState("started");
    }

    function stopTimer() {
        setTimerState("stopped");
    }

    function resetTimer() {
        setTimerState("notStarted");
        if (pomodoroState === "focus") {
            setCount(DEFAULT_FOCUS_TIMER_MINUTE * 60);
        } else {
            setCount(DEFAULT_REST_TIMER_MINUTE * 60);
        }
    }

    return {
        count,
        timerState,
        pomodoroState,
        setPomodoroState,
        startNextPomodoro,
        startTimer,
        stopTimer,
        resetTimer,
    }
}