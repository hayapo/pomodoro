import { useAtomValue } from "jotai";
import { useCallback, useMemo } from "react";
import { timerAtom, TimerAtomType } from "~/atom/atoms";

export const createPomodoroText = (timer: TimerAtomType) => {
    if (timer.paused) {
        return '集中して作業しよう！ 🧘🏻‍♀️'
    }
    return timer.pomodoroState === "focus" ? "モクモク中 💭" : "休憩中 😌";
};