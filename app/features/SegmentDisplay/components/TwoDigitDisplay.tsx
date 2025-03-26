import { Display } from 'react-7-segment-display';

type Props = {
	valiants?: string;
	value: string | number;
	color: string;
	height: number;
};

export function DisplayWithTwoDigits(props: Props) {
	return (
		<Display value={props.value} color={props.color} height={props.height} skew count={2} />
	);
}
