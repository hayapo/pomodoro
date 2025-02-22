import { atomWithStorage } from 'jotai/utils'
import {
	DEFAULT_FOCUS_TIMER_MINUTE,
	DEFAULT_REST_TIMER_MINUTE,
} from '../constants';

export const pomodoroTimesAtom = atomWithStorage(
	'pomodoroTimes',
	{
		focus: DEFAULT_FOCUS_TIMER_MINUTE,
		rest: DEFAULT_REST_TIMER_MINUTE,
	},
	undefined,
	{
		getOnInit: true,
	}
);
