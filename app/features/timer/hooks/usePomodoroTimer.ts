import { useAtom } from 'jotai';
import { useCallback } from 'react';
import usePomodoro from '~/features/Pomodoro/hooks/usePomodoro';
import { timerAtom } from '../states/timerAtom';

const usePomodoroTimer = () => {
	const [timer, setTimer] = useAtom(timerAtom);
	const { pomodoroTimesInSecond } = usePomodoro();

	const startTimer = useCallback(
		() =>
			setTimer((prev) => {
				return {
					...prev,
					paused: false,
				};
			}),
		[setTimer],
	);

	const stopTimer = useCallback(() => {
		setTimer((prev) => {
			return {
				...prev,
				paused: true,
			};
		});
	}, [setTimer]);

	const resetTimer = useCallback(
		() =>
			setTimer((prev) =>
				prev.pomodoroState === 'focus'
					? {
							...prev,
							paused: true,
							count: pomodoroTimesInSecond.focus,
						}
					: {
							...prev,
							paused: true,
							count: pomodoroTimesInSecond.rest,
						},
			),
		[setTimer, pomodoroTimesInSecond],
	);

	return {
		timer,
		setTimer,
		startTimer,
		stopTimer,
		resetTimer,
		pomodoroTimesInSecond,
	};
};

export default usePomodoroTimer;
