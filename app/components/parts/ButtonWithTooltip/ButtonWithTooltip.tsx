import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";

type Props = ButtonProps & {
	children: ReactNode | string;
	tooltipText: string;
	side?: TooltipContentProps['side']
};

export function ButtonWithTooltip(props: Props) {
	const { children, tooltipText, ...buttonProps } = props;
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button {...buttonProps}>
						{props.children}
					</Button>
				</TooltipTrigger>
				<TooltipContent side={props.side || 'right'}>
					<p>{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
