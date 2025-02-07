import { useCallback } from "react";
import { useAtom, useSetAtom } from "jotai";
import { focusTimeAtom, pomodoroStateAtom } from "~/atom/atoms";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "../constants";


export function usePomodoro() {
    const setFocusTime = useSetAtom(focusTimeAtom);
    const [pomodoroState, setPomodoroState] = useAtom(pomodoroStateAtom);
    const startNextPomodoro = useCallback(() => {
        // 次の pomodoroState に遷移し、遷移先のpomodoroStateに応じた時間でタイマーをセット
        if (pomodoroState === "focus") {
            setPomodoroState("rest");
            setFocusTime(DEFAULT_REST_TIMER_MINUTE);
        } else {
            setPomodoroState("focus");
            setFocusTime(DEFAULT_FOCUS_TIMER_MINUTE);
        }
    }, [pomodoroState, setPomodoroState, setFocusTime])

    return {pomodoroState, setPomodoroState, startNextPomodoro}
}