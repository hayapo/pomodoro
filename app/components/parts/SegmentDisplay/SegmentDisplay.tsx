import clsx from "clsx";
import { Display } from "react-7-segment-display";
import type { TimerAtomType } from "~/atom/atoms";

type Props = {
    valiants?: string;
    timer: TimerAtomType;
    value: string | number;
};

export function SegmentDisplay(props: Props) {
    const color = clsx({
        'lime': !props.timer.paused && props.timer.pomodoroState === 'focus',
        'teal': !props.timer.paused && props.timer.pomodoroState === 'rest',
        'white': props.timer.paused,
    })
    return (
        <Display value={props.value} color={color} height={250} skew count={2} />
    )
}