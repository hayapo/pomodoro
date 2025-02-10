import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { focusTimeAtom, restTimeAtom, timerCountBySecondAtom, timerStateAtom } from "~/atom/atoms";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import { usePomodoro } from "~/features/pomodoro/hooks/usePomodoro";

export default function usePomodoroTimer() {
    const {
        pomodoroState,
        setPomodoroState,
        startNextPomodoro,
    } = usePomodoro();
    const [timerState, setTimerState] = useAtom(timerStateAtom);
    // const setFocusTime = useSetAtom(focusTimeAtom);
    // const setRestTime = useSetAtom(restTimeAtom);
    const [focusTimeMinute, setFocusTime] = useAtom(focusTimeAtom);
    const [restTimeMinute, setRestTime] = useAtom(restTimeAtom);
    const [timer, setTimer] = useAtom(timerCountBySecondAtom);

    useEffect(() => {
        console.log(timer);
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
        if (timerState === "notStarted") {
                switch (pomodoroState) {
                case "focus":
                    setPomodoroState("focus");
                    // setFocusTime(focusTimeMinute);
                    setTimer(focusTimeMinute * 60);
                    break;
                case "rest":
                    setPomodoroState("rest");
                    // setRestTime(restTimeMinute); 
                    setTimer(restTimeMinute * 60);
                    break;
            }
        }
        setTimerState("started");
    }

    function stopTimer() {
        setTimerState("stopped");
    }

    function resetTimer() {
        setTimerState("notStarted");
        if (pomodoroState === "focus") {
            setPomodoroState("focus");
            setTimer(focusTimeMinute * 60);
        } else {
            setPomodoroState("rest");
            setTimer(restTimeMinute * 60);
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