import { useAtomValue } from 'jotai';
import { useEffect, useMemo } from 'react';
import { Button } from '~/components/ui/button';
import usePomodoroTimer from '../hooks/usePomodoroTimer';
import { showPomodoroTextAtom } from '../states/showPomodoroTextAtom';
import { createPomodoroText } from '../util/createPomodoroText';
import { TimerDisplay } from '~/features/SegmentDisplay/components/TimerDisplay/TimerDisplay';

export default function Timer() {
	const {
		timer,
		setTimer,
		startTimer,
		stopTimer,
		resetTimer,
		pomodoroTimesInSecond,
	} = usePomodoroTimer();

	const showPomodoroText = useAtomValue(showPomodoroTextAtom);
	const pomodoroText = useMemo(() => {
		return createPomodoroText(timer);
	}, [timer]);

	// biome-ignore lint: useExhaustiveDependencies
	useEffect(() => {
		const timerId = setInterval(() => {
			setTimer((prev) => {
				if (prev.paused) return prev;
				return prev.count === 0
					? {
							...prev,
							pomodoroState: prev.pomodoroState === 'focus' ? 'rest' : 'focus',
							count:
								prev.pomodoroState === 'focus'
									? pomodoroTimesInSecond.rest
									: pomodoroTimesInSecond.focus,
						}
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
			{showPomodoroText && (
				<div className='text-3xl md:text-4xl font-bold'>{pomodoroText}</div>
			)}
			<TimerDisplay />
			<div>
				{timer.paused ? (
					<TimerButton onClick={startTimer} text='START' />
				) : (
					<TimerButton onClick={stopTimer} text='STOP' />
				)}
			</div>
			<TimerButton onClick={resetTimer} text='RESET' />
		</div>
	);
}

function TimerButton(props: {
	onClick: () => void;
	text: string;
}) {
	return (
		<Button
			variant='secondary'
			type='button'
			onClick={props.onClick}
			className='w-[150px] text-3xl p-8 focus-visible:outline-4 focus-visible:outline-seggreen focus-visible:ring-0'
		>
			{props.text}
		</Button>
	);
}
