import { countToMinute, countToSecond } from "~/features/timer/lib/timerFuntions";
import { DisplayWithTwoDigits } from "./TwoDigitDisplay";
import clsx from "clsx";
import { useWindowSize } from "~/hooks/useWindowSize";
import { cn } from "~/lib/utils";
import { useMemo } from "react";
import { timerAtom, type TimerState } from "~/features/timer/states/timerAtom";
import { useAtomValue } from "jotai";
import { settingsAtom } from "~/features/customize/states/settingsAtom";
import { useColors } from "~/features/customize/hooks/useColors";

export function TimerDisplay() {
	const timer = useAtomValue(timerAtom);
	const { size } = useWindowSize();
	const { primaryColor } = useAtomValue(settingsAtom);
	const { bgColor, cssNamedColor } = useColors();

	// segment-displayのheightは innerWidth * 0.2にする
	const computedHeight = useMemo(
		() => (
			// 最大のheightは300にする
			size.width * 0.2 <= 300 ? size.width * 0.2 : 300
		),
		[size.width]
	);

	/**
	 * DisplayのcolorにはCSSのデフォルトの166色が使えるっぽい
	 * @see: https://developer.mozilla.org/ja/docs/Web/CSS/named-color
	 * */
	const color = clsx({
		[cssNamedColor]: !timer.paused && timer.pomodoroState === 'focus',
		teal: !timer.paused && timer.pomodoroState === 'rest',
		white: timer.paused,
	});
	return (
		<div className='flex items-center h-[150px] md:h-[200px] lg:h-[300px]' >
			<DisplayWithTwoDigits value={countToMinute(timer.count)} color={color} height={computedHeight} />
			<Colon timer={timer} bgColor={bgColor} />
			<DisplayWithTwoDigits value={countToSecond(timer.count)} color={color} height={computedHeight} />
		</div>
	)
};

function Colon({ timer, bgColor }: { timer: TimerState, bgColor: string }) {
	const colonSize = clsx('size-[10px] md:size-[15px] lg:size-[20px]')
	const colonColor = cn({
		[bgColor]: !timer.paused && timer.pomodoroState === 'focus',
		'bg-segblue': !timer.paused && timer.pomodoroState === 'rest',
		'bg-white': timer.paused,
	});
	const className = clsx(colonSize, colonColor)
	return (
		<div className="flex flex-col gap-5 md:gap-8 lg:gap-11 rotate-[3.5deg] mt-2 sm:mt-0">
			<div className={className} />
			<div className={className} />
		</div>
	)
}
