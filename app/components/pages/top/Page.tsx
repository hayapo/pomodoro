import { useNotification } from "~/features/notification/hooks/useNotification";
import Timer from "~/features/timer/component/Timer";
import { FormDrawer } from "~/features/customize/components/FormDrawer";

export function Page() {
	useNotification();
	return (
		<>
			<div className="h-full flex justify-center">
				<div className='flex flex-col my-auto items-center justify-center gap-20'>
					<Timer />
					<FormDrawer />
				</div>
			</div>
		</> 
	)
}
