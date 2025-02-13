import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { timerAtom, TimerAtomType, timerStateAtom } from "~/atom/atoms";
import usePomodoro from "~/features/pomodoro/hooks/usePomodoro";
import { SetStateAction } from "jotai";

const useTimer =() => {
    const [timer, setTimer] = useAtom(timerAtom);
    const {
        setFocusTime,
        setRestTime,
        pomodoroTimesInSecond
    } = usePomodoro();

    // biome-ignore lint: useExhaustiveDependencies
    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prev) => {
                if (prev.paused) return prev;
                return prev.count === 0
                    ? {
                        ...prev,
                        pomodoroState: prev.pomodoroState === 'focus' ? 'rest' : 'focus',
                        count: prev.pomodoroState === 'focus' ? pomodoroTimesInSecond.rest : pomodoroTimesInSecond.focus,
                    }
                    : {
                        ...prev,
                        count: prev.count -1,
                    }
            }
            )
        }, 1000);
        return () => clearInterval(timerId);
    }, [setTimer])
    
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
        setFocusTime,
        setRestTime,
        startTimer,
        stopTimer,
        resetTimer,
        pomodoroTimesInSecond
    }
};

export default useTimer;