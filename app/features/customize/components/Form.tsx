import { zodResolver } from '@hookform/resolvers/zod';
import { type SetStateAction, useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { Dispatch, MutableRefObject } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import {
	Form as _Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { outlineStyle } from '~/lib/utils';
import { settingsAtom } from '~/features/customize/states/settingsAtom';
import { Switch } from '~/components/ui/switch';
import { timerAtom } from '~/features/timer/states/timerAtom';
import { useTimerWorkerCommand } from '~/features/timer/hooks/userTimerWokerCommand';
import { WorkerRefAtom } from '~/features/timer/states/workerAtom';

const MIN_COUNT_WARNING = 'タイマーのカウントは1分以上である必要があります';
const MAX_COUNT_WARNING = 'タイマーのカウントは60分以下である必要があります';

export const formValues = z.object({
	focusMinute: z.coerce.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
	restMinute: z.coerce.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
	showPomodoroText: z.coerce.boolean(),
	arrowSendNofitication: z.coerce.boolean(),
	arrowPlayNotificationSound: z.coerce.boolean(),
});

export type IFormValues = z.infer<typeof formValues>;

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function Form({ setOpen }: Props) {
	const setTimer = useSetAtom(timerAtom);
	const [settings, setSettings] = useAtom(settingsAtom);
	
	const worker = useAtomValue(WorkerRefAtom);
	if (!worker) {
		return;
	}
	const { stop } = useTimerWorkerCommand(worker);


	const form = useForm<IFormValues>({
		resolver: zodResolver(formValues),
		defaultValues: {
			showPomodoroText: settings.showPomodoroText,
			arrowSendNofitication: settings.arrowSendNotification,
			arrowPlayNotificationSound: settings.arrowPlayNotificationSound,
			focusMinute: settings.focusMinute,
			restMinute: settings.restMinute,
		},
	});

	const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
		const prevSettings = settings;
		setSettings({
			arrowSendNotification: data.arrowSendNofitication,
			arrowPlayNotificationSound: data.arrowPlayNotificationSound,
			showPomodoroText: data.showPomodoroText,
			focusMinute: data.focusMinute,
			restMinute: data.restMinute,
		});
		console.log(data);
		if (settings.focusMinute !== data.focusMinute || settings.restMinute !== data.restMinute) {
			stop();
			setTimer({
				paused: true,
				pomodoroState: 'focus',
				count: data.focusMinute,
			});
		} else {
			stop()
			setTimer((prev) => ({
				...prev,
				paused: true,
			}));
		}
		setOpen(false);
		toast('カスタマイズを登録しました', {
			action: {
				label: '戻す',
				onClick: () => {
					setSettings(prevSettings);
					toast('カスタマイズを元に戻しました');
				}
			}
		})
	};

	return (
		<_Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto'>
				<div className='flex flex-col gap-4'>
				<FormField
						control={form.control}
						name='arrowSendNofitication'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Switch
										className={outlineStyle}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>通知を送信する</FormLabel>
									<FormDescription>タイマーの切り替わり時に通知を送信する</FormDescription>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='arrowPlayNotificationSound'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Switch
										className={outlineStyle}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>通知音を再生する</FormLabel>
									<FormDescription className='flex flex-col gap-1'>
										<span>タイマーの切り替わり時に通知音を再生する</span>
										<span className='text-red-500'>※ 音量調整機能は実装中のため、大きい音が鳴ります。注意して使用してください</span> 
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='showPomodoroText'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Switch
										className={outlineStyle}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>集中/休憩状態を示すテキストを表示する</FormLabel>
									<FormDescription>タイマーの上に「モクモク中 💭 / 休憩中 😌」というテキストを表示して、現在の集中/休憩状態をわかりやすくすることができます</FormDescription>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='focusMinute'
						render={({ field }) => (
							<FormItem>
								<FormLabel>集中する時間 (min) をカスタマイズ</FormLabel>
								<FormControl>
									<Input className={outlineStyle} placeholder='25' {...field} />
								</FormControl>
								{form.formState.errors.focusMinute ? (
									<FormMessage />
								) : (
									<FormDescription>分単位: 1 ~ 60</FormDescription>
								)}
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='restMinute'
						render={({ field }) => (
							<FormItem>
								<FormLabel>休憩する時間 (min) をカスタマイズ</FormLabel>
								<FormControl>
									<Input className={outlineStyle} placeholder='25' {...field} />
								</FormControl>
								{form.formState.errors.restMinute ? (
									<FormMessage />
								) : (
									<FormDescription>分単位: 1 ~ 60</FormDescription>
								)}
							</FormItem>
						)}
					/>
					<Button variant='secondary' type='submit' className={outlineStyle}>
						カスタマイズを登録
					</Button>
				</div>
			</form>
		</_Form>
	);
}
