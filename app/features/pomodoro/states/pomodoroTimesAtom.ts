import { atom } from 'jotai';
import {
	DEFAULT_FOCUS_TIMER_MINUTE,
	DEFAULT_REST_TIMER_MINUTE,
} from '../constants';

export const pomodoroTimesAtom = atom({
	focus: DEFAULT_FOCUS_TIMER_MINUTE,
	rest: DEFAULT_REST_TIMER_MINUTE,
});
