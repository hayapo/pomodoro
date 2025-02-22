import Timer from "~/features/timer/component/Timer";
import { TimerFormDrawer } from "~/features/timerForm/component/TimerFormDrawer";

export function Page() {
return (
	<div className="h-full flex justify-center">
		<div className='flex flex-col my-auto items-center justify-center gap-20'>
			<Timer />
			<TimerFormDrawer />
		</div>
	</div>
)}
