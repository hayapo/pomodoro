import clsx from 'clsx';
import { Display } from 'react-7-segment-display';
import type { TimerState } from '../../../timer/states/timerAtom';
import { useWindowSize } from '~/hooks/useWindowSize';

type Props = {
	valiants?: string;
	value: string | number;
	color: string;
	height: number;
};

export function TwoDigitDisplay(props: Props) {
	return (
		<Display value={props.value} color={props.color} height={props.height} skew count={2} />
	);
}
