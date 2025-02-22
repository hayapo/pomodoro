import type { TimerState } from '~/features/timer/states/timerAtom';
import { showPomodoroTextAtom } from '../states/showPomodoroTextAtom';
import { useAtomValue } from 'jotai';

export const usePomodoroText = (timer: TimerState) => {
	const showPomodoroText = useAtomValue(showPomodoroTextAtom);
	if (timer.paused || typeof showPomodoroText === 'undefined') {
		return null;
	}
	return timer.pomodoroState === 'focus' ? 'モクモク中 💭' : '休憩中 😌';
};
