import { countToMinute, countToSecond } from "~/features/timer/lib/timerFuntions";
import { TwoDigitDisplay } from "../TowDigitDisplay/TwoDigitDisplay";
import usePomodoroTimer from "~/features/timer/hooks/usePomodoroTimer";
import clsx from "clsx";
import { useWindowSize } from "~/hooks/useWindowSize";
import { cn } from "~/lib/utils";
import { useMemo } from "react";
import type { TimerState } from "~/features/timer/states/timerAtom";

export function TimerDisplay() {
	const { timer } = usePomodoroTimer();
	const { size } = useWindowSize();

	// segment-displayのheightは innerWidth * 0.2にする
	const computedHeight = useMemo(
		() => (
			// 最大のheightは300する
			size.width * 0.2 <= 300 ? size.width * 0.2 : 300
		),
		[size.width]
	);

	/**
	 * DisplayのcolorにはCSSのデフォルトの166色が使えるっぽい
	 * @see: https://developer.mozilla.org/ja/docs/Web/CSS/named-color
	 * */
	const color = clsx({
		lime: !timer.paused && timer.pomodoroState === 'focus',
		teal: !timer.paused && timer.pomodoroState === 'rest',
		white: timer.paused,
	});
	return (
		<div className='flex items-center h-[150px] md:h-[200px] lg:h-[300px]' >
			<TwoDigitDisplay value={countToMinute(timer.count)} color={color} height={computedHeight} />
			<Colon timer={timer} />
			<TwoDigitDisplay value={countToSecond(timer.count)} color={color} height={computedHeight} />
		</div>
	)
};

function Colon({ timer }: { timer: TimerState }) {
	const colonSize = clsx('size-[10px] md:size-[15px] lg:size-[20px]')
	const colonColor = cn({
		'seggreen': !timer.paused && timer.pomodoroState === 'focus',
		'segblue': !timer.paused && timer.pomodoroState === 'rest',
		'white': timer.paused,
	});
	const className = clsx(colonSize, `bg-${colonColor}`)
	return (
		<div className="flex flex-col gap-5 md:gap-8 lg:gap-11 rotate-[3.5deg] mt-2 sm:mt-0">
			<div className={className} />
			<div className={className} />
		</div>
	)
}
