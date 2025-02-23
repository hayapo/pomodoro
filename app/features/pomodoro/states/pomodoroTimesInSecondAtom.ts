import { atom } from 'jotai';
import { settingsAtom } from '~/features/customize/states/settingsAtom';

export const pomodoroTimesInSecondAtom = atom((get) => ({
	focus: get(settingsAtom).focusMinute * 60,
	rest: get(settingsAtom).restMinute * 60,
}));
