import { useCallback } from "react";
import { useAtom, useSetAtom } from "jotai";
import { countAtom, pomodoroAtom } from "~/atom/atoms";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "../constants";


export function usePomodoro() {
    const setCount = useSetAtom(countAtom);
    const [pomodoroState, setPomodoroState] = useAtom(pomodoroAtom);
    const startNextPomodoro = useCallback(() => {
        if (pomodoroState === "focus") {
            setPomodoroState("rest");
            setCount(DEFAULT_REST_TIMER_MINUTE * 60);
        } else {
            setPomodoroState("focus")
            setCount(DEFAULT_FOCUS_TIMER_MINUTE * 60);
        }
    }, [pomodoroState, setPomodoroState, setCount])

    return {pomodoroState, setPomodoroState, startNextPomodoro}
}