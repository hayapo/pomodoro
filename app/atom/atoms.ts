import { atom } from "jotai";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoro";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import type { TimerState } from "~/features/timer/types/timer";
import type { SetStateAction } from "jotai";

export const timerStateAtom = atom<TimerState>("notStarted")

export const pomodoroStateAtom = atom<PomodoroState>("focus")

export const focusTimeAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE);

export const restTimeAtom = atom(DEFAULT_REST_TIMER_MINUTE);

export type TimerAtomType = {
    paused: boolean;
    pomodoroState: PomodoroState;
    count: number;
};

const _timerAtom = atom<TimerAtomType>({
    paused: true,
    pomodoroState: 'focus',
    count: DEFAULT_FOCUS_TIMER_MINUTE * 60
});

export const timerAtom = atom(
    (get) => get(_timerAtom),
    (get, set, newValue: SetStateAction<TimerAtomType>) => {
        const nextValue = typeof newValue === "function"
            ? {
                paused: newValue(get(_timerAtom)).paused,
                pomodoroState: newValue(get(_timerAtom)).pomodoroState,
                count: newValue(get(_timerAtom)).count,
            }
            : {
                paused: newValue.paused,
                pomodoroState: newValue.pomodoroState,
                count: newValue.count * 60,
            };
        set(_timerAtom, nextValue);
    }
);