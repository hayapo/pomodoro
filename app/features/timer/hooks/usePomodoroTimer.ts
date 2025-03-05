import { useAtom } from "jotai";
import type { Settings } from "~/features/customize/states/settingsAtom";
import { timerAtom } from "../states/timerAtom";
import { useCallback, useEffect, useRef } from "react";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoroState";
import { SITE_NAME } from "~/constants";
import { toast } from "sonner";
import { useNotifications } from "~/features/notification/hooks/useNotifications";
import type { PomodoroTimesInSecondState } from "~/features/pomodoro/states/pomodoroTimesInSecondAtom";

/**
 * @param pomodoroTimesInSecond	集中/休憩分数を秒にしたもの
 * @param settings							通知や音などの設定
 */
export const usePomodoroTimer = (
	pomodoroTimesInSecond: PomodoroTimesInSecondState,
	settings: Settings,
) => {
	const workerRef = useRef<Worker | null>(null);
	const [timer, setTimer] = useAtom(timerAtom);
	const { sendNotification, playNotificationSound} = useNotifications();

	
	//biome-ignore lint:
	useEffect(() => {
		console.log(timer.count);
		workerRef.current = new Worker(new URL('../lib/timerWorker.ts', import.meta.url));

		workerRef.current.onmessage = (event) => {
			setTimer((prev) => {
				if (prev.paused) {
					return prev;
				}
				if (event.data.newCount <= 0) {
					const nextPomodoroState = prev.pomodoroState === 'focus' ? 'rest' : 'focus';
					return {
						...prev,
						pomodoroState: nextPomodoroState,
						count: pomodoroTimesInSecond[nextPomodoroState],
					};
				}
				return {
					...prev,
					count: event.data.newCount,
				};
			});
		}

		// const timerId = setInterval(() => {
		// 	setTimer((prev) => {
		// 		if (prev.paused) {
		// 			return prev;
		// 		}
		// 		if (prev.count <= 0) {
		// 			const nextPomodoroState = prev.pomodoroState === 'focus' ? 'rest' : 'focus';
		// 			return {
		// 				...prev,
		// 				pomodoroState: nextPomodoroState,
		// 				count: pomodoroTimesInSecond[nextPomodoroState],
		// 			};
		// 		}
		// 		return {
		// 			...prev,
		// 			count: prev.count - 1,
		// 		};
		// 	});
		// }, 1000);
		// return () => clearInterval(timerId);
		return () => {
			if (workerRef.current) {
				workerRef.current.terminate();
			}
		}
	}, []);

	const prevStateRef = useRef<PomodoroState>(timer.pomodoroState);
	//biome-ignore lint:
	useEffect(() => {
		const prevState = prevStateRef.current;
		const nextState = timer.pomodoroState;
		if (prevState !== nextState && !timer.paused) {
			if (settings.arrowSendNotification) {
				sendNotification(
					{
						title: SITE_NAME,
						body:
							nextState === 'focus'
								? '集中する時間です'
								: '休憩する時間です'
					},
					`${nextState}-${Date.now()}`
				)
			}
			if (settings.arrowPlayNotificationSound) {
				playNotificationSound();
			}
		}
		prevStateRef.current = nextState;
	}, [timer.pomodoroState, timer.paused, settings]);

	const start = useCallback(() => {
		setTimer((prev) => ({...prev, paused: false}));
		toast('タイマーをスタートしました');
	}, [setTimer]);

	const stop = useCallback(() => {
		setTimer((prev) => ({...prev, paused: true}));
		toast('タイマーをストップしました');
	}, [setTimer]);

	const reset = useCallback(() => {
		setTimer((prev) => {
			const defaultCount = prev.pomodoroState === 'focus' ? pomodoroTimesInSecond.focus : pomodoroTimesInSecond.rest;
			return {
				...prev,
				paused: true,
				count: defaultCount,
			}
		});
		toast('タイマーをリセットしました');
	}, [setTimer, pomodoroTimesInSecond]);

	return {
		timer,
		start,
		stop,
		reset,
	}
}
