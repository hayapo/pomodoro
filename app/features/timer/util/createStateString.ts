import type { PomodoroState } from "~/features/pomodoro/types/pomodoro";
import type { TimerState } from "../types/timer";

export function createStateString(timerState: TimerState, pomodoroState: PomodoroState) {
    if (timerState === 'notStarted') {
        return '集中して作業しよう！'
    }
    return pomodoroState === "focus" ? "モクモク中💭" : "休憩";
}