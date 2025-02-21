import type { TimerState } from '~/features/Timer/states/timerAtom';

export const createPomodoroText = (timer: TimerState) => {
	if (timer.paused) {
		return '集中して作業しよう！ 🧘🏻‍♀️';
	}
	return timer.pomodoroState === 'focus' ? 'モクモク中 💭' : '休憩中 😌';
};
