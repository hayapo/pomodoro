import Timer from "~/features/Timer/component/Timer";
import { TimerFormDrawer } from "~/features/TimerForm/component/TimerFormDrawer";

export function Page() {
return (
	<div className="w-full h-full flex justify-center">
		<div className='max-h-svh flex flex-col my-auto items-center justify-center gap-20'>
			<Timer />
			<TimerFormDrawer />
		</div>
	</div>
)}
