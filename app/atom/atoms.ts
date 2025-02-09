import { atom } from "jotai";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoro";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import type { TimerState } from "~/features/timer/types/timer";
import { number } from "zod";

export const timerStateAtom = atom<TimerState>("notStarted")

export const pomodoroStateAtom = atom<PomodoroState>("focus")

export const focusTimeAtom = atom(
    null,
    (_get, set, newValue: number) => set(focusTimerCountAtom, newValue * 60),
);

export const focusTimerCountAtom = atom(DEFAULT_FOCUS_TIMER_MINUTE * 60);

export const restTimerAtom = atom(
    null,
    (_get, set, newValue: number) => set(restTimerCountAtom, newValue * 60),
)

export const restTimerCountAtom = atom(DEFAULT_REST_TIMER_MINUTE * 60);