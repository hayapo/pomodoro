import clsx from 'clsx';
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
import { Form } from './Form';
import { drawerStateAtom } from '../states/drawerStateAtom';
import { useAtom } from 'jotai';
import type { MutableRefObject } from 'react';

type Props = {
	workerRef: MutableRefObject<Worker | null>;
}

export function FormDrawer(props: Props) {
	const [open, setOpen] = useAtom(drawerStateAtom);

	return (
		<Drawer open={open} onOpenChange={setOpen} autoFocus={open}>
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
						<DrawerTitle>設定をカスタマイズする</DrawerTitle>
						<DrawerDescription>
							通知送信の有無、表示テキストの表示/非表示、集中する時間と休憩する時間をカスタマイズすることができます
						</DrawerDescription>
					</DrawerHeader>
					<div className='p-4'>
						<Form setOpen={setOpen} workerRef={props.workerRef} />
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
