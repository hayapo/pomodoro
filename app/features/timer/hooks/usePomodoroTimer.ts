import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { timerAtom } from "~/atom/atoms";
import usePomodoro from "~/features/Pomodoro/hooks/usePomodoro";

const usePomodoroTimer =() => {
    const [timer, setTimer] = useAtom(timerAtom);
    const {
        setFocusTime,
        setRestTime,
        pomodoroTimesInSecond
    } = usePomodoro();
    
    const startTimer = useCallback(() => (
        setTimer((prev) => {
            return {
                ...prev,
                paused: false,
            }
        })
    ), [setTimer]);

    const stopTimer = useCallback(() => {
        setTimer((prev) => {
            return {
                ...prev,
                paused: true,
            }
        })
    }, [setTimer])

    const resetTimer = useCallback(() => (
        setTimer((prev) => 
            prev.pomodoroState === 'focus'
                ?
                    {
                        ...prev,
                        paused: true,
                        count: pomodoroTimesInSecond.focus,
                    }
                :
                    {
                        ...prev,
                        paused: true,
                        count: pomodoroTimesInSecond.rest,
                    }
        )
    ), [setTimer, pomodoroTimesInSecond]);

    return {
        timer,
        setTimer,
        startTimer,
        stopTimer,
        resetTimer,
        pomodoroTimesInSecond
    }
};

export default usePomodoroTimer;