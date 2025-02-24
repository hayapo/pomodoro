import { atom } from 'jotai';
import { settingsAtom } from '~/features/customize/states/settingsAtom';

export type PomodoroTimesInSecondState = {
	focus: number;
	rest: number;
}

export const pomodoroTimesInSecondAtom = atom<PomodoroTimesInSecondState>((get) => ({
	focus: get(settingsAtom).focusMinute * 60,
	rest: get(settingsAtom).restMinute * 60,
}));
