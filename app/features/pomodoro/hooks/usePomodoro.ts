import { useCallback } from "react";
import { useAtom, useSetAtom } from "jotai";
import { focusTimeAtom, pomodoroStateAtom, restTimeAtom, timerCountBySecondAtom, timerStateAtom } from "~/atom/atoms";


export function usePomodoro() {
    const [focusTime, setFocusTime] = useAtom(focusTimeAtom);
    const [restTime, setRestTime] = useAtom(restTimeAtom);
    const setTimer = useSetAtom(timerCountBySecondAtom);
    const [pomodoroState, setPomodoroState] = useAtom(pomodoroStateAtom);
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

    return {pomodoroState, setPomodoroState, startNextPomodoro}
}