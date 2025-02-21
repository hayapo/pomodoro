import { atom } from 'jotai';
import { pomodoroTimesAtom } from './pomodoroTimesAtom';

export const pomodoroTimesInSecondAtom = atom((get) => ({
	focus: get(pomodoroTimesAtom).focus * 60,
	rest: get(pomodoroTimesAtom).rest * 60,
}));
