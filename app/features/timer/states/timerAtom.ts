import { atom, type SetStateAction } from "jotai";
import { atomWithDefault } from "jotai/utils";
import { settingsAtom } from "~/features/customize/states/settingsAtom";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoroState";

export type TimerState = {
	paused: boolean;
	pomodoroState: PomodoroState;
	count: number;
};

const _timerAtom = atomWithDefault<TimerState>(
	(get) => ({
    paused: true,
    pomodoroState: 'focus',
    count: get(settingsAtom).focusMinute * 60,
	})
);

export const timerAtom = atom(
    (get) => get(_timerAtom),
    (get, set, newValue: SetStateAction<TimerState>) => {
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
