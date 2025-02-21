import { type SetStateAction, atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import { DEFAULT_FOCUS_TIMER_MINUTE } from '~/features/Pomodoro/constants';
import type { PomodoroState } from '~/features/Pomodoro/types/pomodoro';

export type TimerState = {
	paused: boolean;
	pomodoroState: PomodoroState;
	count: number;
};

const _timerAtom = atomWithImmer<TimerState>({
	paused: true,
	pomodoroState: 'focus',
	count: DEFAULT_FOCUS_TIMER_MINUTE * 60,
});

export const timerAtom = atom(
	(get) => get(_timerAtom),
	(get, set, newValue: SetStateAction<TimerState>) => {
		const nextValue =
			typeof newValue === 'function'
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
	},
);
