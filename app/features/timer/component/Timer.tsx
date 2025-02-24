import { useAtomValue } from 'jotai';
import { usePomodoroText } from '../hooks/usePomodoroText';
import { TimerDisplay } from '~/features/segmentDisplay/components/TimerDisplay/TimerDisplay';
import { settingsAtom } from '~/features/customize/states/settingsAtom';
import { TimerButton } from './TimerButton';
import { usePomodoroTimer } from '../hooks/usePomodoroTimer';
import { pomodoroTimesInSecondAtom } from '~/features/pomodoro/states/pomodoroTimesInSecondAtom';

export default function Timer() {
	const settings = useAtomValue(settingsAtom);
	const pomodoroTimesInSecond = useAtomValue(pomodoroTimesInSecondAtom);
	const { timer, start, stop, reset } = usePomodoroTimer(pomodoroTimesInSecond.focus, pomodoroTimesInSecond.rest, settings);
	const { pomodoroText } = usePomodoroText();

	return (
		<div className='flex flex-col justify-center items-center gap-5'>
			{pomodoroText && settings.showPomodoroText ? (
				<div className='h-[20px] sm:h-[50px] xl:h-[70px] flex items-center text-3xl md:text-5xl font-bold text-center'>{pomodoroText}</div>
			) : (
				<div className='h-[20px] sm:h-[50px] xl:h-[70px] text-3xl md:text-5xl' />
			)}
			<TimerDisplay />
			<div className='flex flex-col sm:flex-row gap-8'>
				{timer.paused ? (
					<TimerButton onClick={start} text='START' tooltipText='タイマーを開始する'/>
				) : (
					<TimerButton onClick={stop} text='STOP' tooltipText='タイマーを停止する' />
				)}
				<TimerButton onClick={reset} text='RESET' tooltipText='現在の集中/休憩状態のまま、タイマーをリセットする' />
			</div>
		</div>
	);
};
