import { ButtonWithTooltip } from "~/components/parts/ButtonWithTooltip/ButtonWithTooltip";

export function TimerButton(props: {
	onClick: () => void;
	text: string;
	tooltipText: string;
}) {
	return (
		<ButtonWithTooltip
			variant='secondary'
			type='button'
			onClick={props.onClick}
			className='w-[150px] text-3xl p-8 focus-visible:outline-4 focus-visible:outline-seggreen focus-visible:ring-0'
			tooltipText={props.tooltipText}
			side='top'
		>
			{props.text}
		</ButtonWithTooltip>
	);
}
