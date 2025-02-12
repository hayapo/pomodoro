import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { timerAtom, timerStateAtom } from "~/atom/atoms";
import usePomodoro from "~/features/pomodoro/hooks/usePomodoro";
import { preview } from "vite";

const useTimer =() => {
    const [timerState, setTimerState] = useAtom(timerStateAtom);
    const [timer, setTimer] = useAtom(timerAtom);
    const [initialTime] = useState(Date.now);
    const {
        focusTime,
        setFocusTime,
        restTime,
        setRestTime,
        pomodoroState,
        setPomodoroState,
    } = usePomodoro();

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prev) => {
                if (prev.paused) return prev;
                return prev.count === 0
                    ? {
                        ...prev,
                        pomodoroState: prev.pomodoroState === 'focus' ? 'rest' : 'focus',
                        count: prev.pomodoroState === 'focus' ? restTime : focusTime,
                    }
                    : {
                        ...prev,
                        count: prev.count -1,
                    }
            }
            )
        }, 1000);
        return () => clearInterval(timerId);
    })
    
    function startTimer() {
        if (timerState === "notStarted" || timerState === "stopped") {
            switch (pomodoroState) {
                case "focus":
                    setPomodoroState("focus");
                    setTimer((prev) => ({
                        paused: false,
                        pomodoroState: 'focus',
                        count: prev.count,
                    }));
                    break;
            case "rest":
                setPomodoroState("rest");
                    setTimer((prev) => ({
                        paused: false,
                        pomodoroState: 'focus',
                        count: prev.count,
                    }));
                    break;
            }
        }
        setTimerState("started");
    }

    function stopTimer() {
        setTimerState("stopped");
        setTimer((prev) => {
            return {
                ...prev,
                paused: true,
            }
        })
    }

    function resetTimer() {
        setTimerState("notStarted");
        if (pomodoroState === "focus") {
            setPomodoroState("focus");
            setTimer((prev) => ({
                ...prev,
                paused: true,
                count: focusTime,
            }));
        } else {
            setPomodoroState("rest");
            setTimer((prev) => ({
                ...prev,
                paused: true,
                count: restTime,
            }));
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
};

export default useTimer;