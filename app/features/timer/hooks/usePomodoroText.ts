import type { TimerState } from '~/features/timer/states/timerAtom';
import { useAtomValue } from 'jotai';
import { settingsAtom } from '~/features/customize/states/settingsAtom';

export const usePomodoroText = (timer: TimerState) => {
	const settings = useAtomValue(settingsAtom);
	if (timer.paused || typeof settings.showPomodoroText === 'undefined') {
		return null;
	}
	return timer.pomodoroState === 'focus' ? 'モクモク中 💭' : '休憩中 😌';
};
