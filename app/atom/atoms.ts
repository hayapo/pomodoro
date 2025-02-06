import { atom } from "jotai";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoro";
import { DEFAULT_FOCUS_TIMER_MINUTE } from "~/features/pomodoro/constants";
import type { TimerState } from "~/features/timer/types/timer";

export const timerStateAtom = atom<TimerState>("notStarted")

export const pomodoroStateAtom = atom<PomodoroState>("focus")

export const focusTimeAtom = atom(
    null,
    (_get, set, newValue: number) => set(timerCountAtom, newValue * 60),
);

export const timerCountAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE * 60);
