import { timerAtom, type TimerState } from '~/features/timer/states/timerAtom';
import { useAtomValue } from 'jotai';
import { settingsAtom } from '~/features/customize/states/settingsAtom';
import { useMemo } from 'react';

export const usePomodoroText =  () => {
	const timer = useAtomValue(timerAtom);
	const settings = useAtomValue(settingsAtom);
	const pomodoroText = useMemo(() => {
		if (timer.paused || typeof settings.showPomodoroText === 'undefined') {
			return null;
		}
		return timer.pomodoroState === 'focus' ? 'モクモク中 💭' : '休憩中 😌';
	}, [timer, settings])
	return {
		pomodoroText
	}
};
