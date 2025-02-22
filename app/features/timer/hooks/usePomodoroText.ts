import { timerAtom, type TimerState } from '~/features/Timer/states/timerAtom';
import { showPomodoroTextAtom } from '../states/showPomodoroTextAtom';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';

export const usePomodoroText = (timer: TimerState) => {
	const showPomodoroText = useAtomValue(showPomodoroTextAtom);
	if (timer.paused || typeof showPomodoroText === 'undefined') {
		return null;
	}
	return timer.pomodoroState === 'focus' ? 'モクモク中 💭' : '休憩中 😌';
};
