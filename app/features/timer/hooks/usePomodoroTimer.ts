import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import usePomodoro from '~/features/pomodoro/hooks/usePomodoro';
import { timerAtom, type TimerState } from '../states/timerAtom';
import { toast } from 'sonner';
import { SITE_NAME } from '~/constants';
import { useNotification } from '~/features/notification/hooks/useNotification';
import clsx from 'clsx';

const usePomodoroTimer = () => {
	const [timer, setTimer] = useAtom(timerAtom);
	const { pomodoroTimesInSecond } = usePomodoro();

	const startTimer = useCallback(
		() => {
			setTimer((prev) => {
				return {
					...prev,
					paused: false,
				};
			})
			toast('タイマーをスタートしました');
		},
		[setTimer]
	);

	const stopTimer = useCallback(
		() => {
			setTimer((prev) => {
				return {
					...prev,
					paused: true,
				};
			});
			toast('タイマーをストップしました');
		}, 
		[setTimer],
	);

	const resetTimer = useCallback(
		() => {
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
			)
			toast('タイマーをリセットしました')
		},
		[setTimer, pomodoroTimesInSecond],
	);

	const startNextPomodoro = useCallback((prevTimer: TimerState, shouldSendNotification: boolean): TimerState => {
		const nextPomodoroState = prevTimer.pomodoroState === 'focus' ? 'rest' : 'focus';
		const currentTime = new Date().getTime();
		const { sendNotification } = useNotification();
		shouldSendNotification && sendNotification(
			{
				title: SITE_NAME,
				body: nextPomodoroState === 'focus' ? '集中する時間です' : '休憩する時間です',
			},
			`${nextPomodoroState}=${currentTime}`
	)
		return ({
			...prevTimer,
			pomodoroState: nextPomodoroState,
			count: nextPomodoroState === 'focus' 
				? pomodoroTimesInSecond.focus
				: pomodoroTimesInSecond.rest,
		});
	}, [pomodoroTimesInSecond])

	return {
		timer,
		setTimer,
		startTimer,
		stopTimer,
		resetTimer,
		startNextPomodoro,
		pomodoroTimesInSecond,
	};
};

export default usePomodoroTimer;
