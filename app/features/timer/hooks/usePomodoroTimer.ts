import { useAtom } from "jotai";
import type { Settings } from "~/features/customize/states/settingsAtom";
import { timerAtom } from "../states/timerAtom";
import { useCallback, useEffect, useRef } from "react";
import type { PomodoroState } from "~/features/pomodoro/types/pomodoroState";
import { SITE_NAME } from "~/constants";
import { toast } from "sonner";
import { useNotifications } from "~/features/notification/hooks/useNotifications";

/**
 * @param focusSeconds 集中モードの秒数(例: 25分なら1500)
 * @param restSeconds  休憩モードの秒数(例: 5分なら300)
 * @param settings     通知や音などの設定
 */
export const usePomodoroTimer = (
	focusSeconds: number,
	restSeconds: number,
	settings: Settings,
) => {
	const [timer, setTimer] = useAtom(timerAtom);
	const { sendNotification, playNotificationSound} = useNotifications();

	//biome-ignore lint:
	useEffect(() => {
		const timerId = setInterval(() => {
			setTimer((prev) => {
				if (prev.paused) {
					return prev;
				}
				if (prev.count <= 0) {
					const nextPomodoroState = prev.pomodoroState === 'focus' ? 'rest' : 'focus';
					const nextCount = prev.pomodoroState === 'focus' ? restSeconds : focusSeconds;
					return {
						...prev,
						pomodoroState: nextPomodoroState,
						count: nextCount,
					};
				}
				return {
					...prev,
					count: prev.count - 1,
				};
			});
		}, 1000);
		return () => clearInterval(timerId);
	}, [focusSeconds, restSeconds]);

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
			const defaultCount = prev.pomodoroState === 'focus' ? focusSeconds : restSeconds;
			return {
				...prev,
				paused: true,
				count: defaultCount,
			}
		});
		toast('タイマーをリセットしました');
	}, [setTimer, focusSeconds, restSeconds]);

	return {
		timer,
		start,
		stop,
		reset,
	}
}
