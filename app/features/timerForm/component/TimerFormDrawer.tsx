import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '~/components/ui/drawer';
import { outlineStyle } from '~/lib/utils';
import { TimerForm } from './TimerForm';

export function TimerFormDrawer() {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button
					variant='outline'
					className={clsx(outlineStyle, 'w-[150px] p-4')}
				>
					カスタマイズ
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>タイマーをカスタマイズする</DrawerTitle>
						<DrawerDescription>
							集中する時間と休憩する時間を分単位でカスタマイズすることができます
						</DrawerDescription>
					</DrawerHeader>
					<div className='p-4'>
						<TimerForm setOpen={setOpen} />
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant='outline' className={clsx(outlineStyle)}>
								閉じる
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
