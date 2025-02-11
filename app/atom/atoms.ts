import { atom } from "jotai";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoro";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import type { TimerState } from "~/features/timer/types/timer";
import type { SetStateAction } from "jotai";

export const timerStateAtom = atom<TimerState>("notStarted")

export const pomodoroStateAtom = atom<PomodoroState>("focus")

export const focusTimeAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE);

export const restTimeAtom = atom(DEFAULT_REST_TIMER_MINUTE);

const _timerAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE * 60);

export const timerAtom = atom(
    (get) => get(_timerAtom),
    (get, set, newValue: SetStateAction<number>) => {
        const nextValue = typeof newValue === "function" ? newValue(get(_timerAtom)) : newValue * 60;
        set(_timerAtom, nextValue);
    }
);