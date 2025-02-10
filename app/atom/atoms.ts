import { atom } from "jotai";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoro";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import type { TimerState } from "~/features/timer/types/timer";

export const timerStateAtom = atom<TimerState>("notStarted")

export const pomodoroStateAtom = atom<PomodoroState>("focus")

const InitialFocusTimeMinuteAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE); 

// export const focusTimeSecondAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE * 60);

export const focusTimeAtom = atom(
    (get) => get(InitialFocusTimeMinuteAtom),
    (_get, set, newValue: number) => set(timerCountBySecondAtom, newValue * 60),
);

export const InitialRestTimeMinuteAtom = atom(DEFAULT_REST_TIMER_MINUTE);

// export const restTimeSecondAtom = atom(DEFAULT_REST_TIMER_MINUTE * 60);

export const restTimeAtom = atom(
    (get) => get(InitialRestTimeMinuteAtom),
    (_get, set, newValue: number) => set(timerCountBySecondAtom, newValue * 60),
)

export const timerCountBySecondAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE * 60);