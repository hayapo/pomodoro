import { atom } from "jotai";
import { PomodoroState } from "~/features/pomodoro/types/pomodoro";
// import { DEFAULT_FOCUS_TIMER_MINUTE } from "~/features/pomodoro/constants";
import { TimerState } from "~/features/timer/types/timer";

export const timerAtom = atom<TimerState>("notStarted")

export const pomodoroAtom = atom<PomodoroState>("focus")

export const countAtom = atom(3);