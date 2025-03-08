import Timer from "~/features/timer/component/Timer";
import { FormDrawer } from "~/features/customize/components/FormDrawer";
import { useRef } from "react";

export function Page() {
	const workerRef = useRef<Worker | null>(null);
	return (
		<>
			<div className="h-full flex justify-center">
				<div className='flex flex-col my-auto items-center justify-center gap-20'>
					<Timer workerRef={workerRef}/>
					<FormDrawer workerRef={workerRef}/>
				</div>
			</div>
		</> 
	)
}
