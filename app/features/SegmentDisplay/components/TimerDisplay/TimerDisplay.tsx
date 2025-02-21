import { countToMinute, countToSecond } from "~/features/Timer/lib/timerFuntions";
import { TwoDigitDisplay } from "../TowDigitDisplay/TwoDigitDisplay";
import usePomodoroTimer from "~/features/Timer/hooks/usePomodoroTimer";
import clsx from "clsx";
import { useWindowSize } from "~/hooks/useWindowSize";
import { cn } from "~/lib/utils";
import { useMemo } from "react";

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
	const colonClassName = cn('text-6xl sm:text-8xl lg:text-9xl font-bold', {
		'text-seggreen': !timer.paused && timer.pomodoroState === 'focus',
		'text-segblue': !timer.paused && timer.pomodoroState === 'rest',
		'text-white': timer.paused,
	});
	return (
		<div className={`flex items-center h-[${computedHeight}px]`} >
			<TwoDigitDisplay value={countToMinute(timer.count)} color={color} height={computedHeight} />
			<div className={colonClassName}>:</div>
			<TwoDigitDisplay value={countToSecond(timer.count)} color={color} height={computedHeight} />
		</div>
	)
}
