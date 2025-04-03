import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "~/lib/utils"
import { Colors } from "~/features/customize/types/colors"
import clsx from "clsx"
import { useAtomValue } from "jotai"
import { settingsAtom } from "~/features/customize/states/settingsAtom"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref,) => {
	const { primaryColor } = useAtomValue(settingsAtom);
	// const sliderBgColor = (() => {
	// 	switch(primaryColor) {
	// 		case "lime":
	// 			return clsx('bg-lime')
	// 		case "mediumslateblue":
	// 			return clsx('bg-mediumslateblue')
	// 		case "hotpink":
	// 			return clsx('bg-hotpink')
	// 	}
	// })();
	console.log(primaryColor);
	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center",
				className
			)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white">
				<SliderPrimitive.Range className={clsx('absolute h-full', `bg-${primaryColor}`)} />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
		</SliderPrimitive.Root>
		)
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
