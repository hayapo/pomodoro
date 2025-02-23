import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import usePomodoroTimer from '../hooks/usePomodoroTimer';
import { usePomodoroText } from '../hooks/usePomodoroText';
import { TimerDisplay } from '~/features/segmentDisplay/components/TimerDisplay/TimerDisplay';
import { settingsAtom } from '~/features/customize/states/settingsAtom';
import { TimerButton } from './TimerButton';
import { TooltipProvider } from '~/components/ui/tooltip';

export default function Timer() {
	const {
		timer,
		setTimer,
		startTimer,
		stopTimer,
		resetTimer,
		startNextPomodoro,
	} = usePomodoroTimer();
	const pomodoroText = usePomodoroText(timer);
	const { showPomodoroText, shouldSendNotification } = useAtomValue(settingsAtom);
	console.log(timer.count);
	// biome-ignore lint: useExhaustiveDependencies
	useEffect(() => {
		const timerId = setInterval(() => {
			setTimer((prev) => {
				if (prev.paused) return prev;
				return prev.count === 0
					? startNextPomodoro(prev, shouldSendNotification)
					: {
							...prev,
							count: prev.count - 1,
						};
			});
		}, 1000);
		return () => clearInterval(timerId);
	}, [setTimer]);

	return (
		<div className='flex flex-col justify-center items-center gap-5'>
			{pomodoroText && showPomodoroText ? (
				<div className='h-[20px] sm:h-[50px] xl:h-[70px] flex items-center text-3xl md:text-5xl font-bold text-center'>{pomodoroText}</div>
			) : (
				<div className='h-[20px] sm:h-[50px] xl:h-[70px] text-3xl md:text-5xl' />
			)}
			<TimerDisplay />
			<div className='flex flex-col sm:flex-row gap-8'>
				{timer.paused ? (
					<TimerButton onClick={startTimer} text='START' tooltipText='タイマーを開始する'/>
				) : (
					<TimerButton onClick={stopTimer} text='STOP' tooltipText='タイマーを停止する' />
				)}
				<TimerButton onClick={resetTimer} text='RESET' tooltipText='現在の集中/休憩状態のまま、タイマーをリセットする' />
			</div>
		</div>
	);
};
