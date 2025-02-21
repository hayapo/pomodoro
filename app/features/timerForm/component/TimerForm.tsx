import { zodResolver } from '@hookform/resolvers/zod';
import { type SetStateAction, useAtom } from 'jotai';
import type { Dispatch } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import usePomodoro from '~/features/Pomodoro/hooks/usePomodoro';
import usePomodoroTimer from '~/features/Timer/hooks/usePomodoroTimer';
import { showPomodoroTextAtom } from '~/features/Timer/states/showPomodoroTextAtom';
import { outlineStyle } from '~/lib/utils';

const MIN_COUNT_WARNING = 'タイマーのカウントは1分以上である必要があります';
const MAX_COUNT_WARNING = 'タイマーのカウントは60分以下である必要があります';

export const formValues = z.object({
	showPomodoroText: z.coerce.boolean(),
	focus: z.coerce.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
	rest: z.coerce.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
});

export type IFormValues = z.infer<typeof formValues>;

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function TimerForm({ setOpen }: Props) {
	const { pomodoroTimes, setPomodoroTimes } = usePomodoro();
	const { setTimer } = usePomodoroTimer();
	const [showPomodoroText, setShowPomodoroText] = useAtom(showPomodoroTextAtom);
	const form = useForm<IFormValues>({
		resolver: zodResolver(formValues),
		defaultValues: {
			showPomodoroText: showPomodoroText,
			focus: pomodoroTimes.focus,
			rest: pomodoroTimes.rest,
		},
	});

	const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
		setPomodoroTimes({
			focus: data.focus,
			rest: data.rest,
		});
		setTimer({
			paused: true,
			pomodoroState: 'focus',
			count: data.focus,
		});
		setShowPomodoroText(data.showPomodoroText);
		setOpen(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='mx-auto'>
				<div className='flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='showPomodoroText'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										className={outlineStyle}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>「作業中・休憩中」のテキストを表示する</FormLabel>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='focus'
						render={({ field }) => (
							<FormItem>
								<FormLabel>集中する時間 (min) をカスタマイズ</FormLabel>
								<FormControl>
									<Input className={outlineStyle} placeholder='25' {...field} />
								</FormControl>
								{form.formState.errors.focus ? (
									<FormMessage />
								) : (
									<FormDescription>分単位（1~60）</FormDescription>
								)}
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='rest'
						render={({ field }) => (
							<FormItem>
								<FormLabel>休憩する時間 (min) をカスタマイズ</FormLabel>
								<FormControl>
									<Input className={outlineStyle} placeholder='25' {...field} />
								</FormControl>
								{form.formState.errors.rest ? (
									<FormMessage />
								) : (
									<FormDescription>分単位（1~60）</FormDescription>
								)}
							</FormItem>
						)}
					/>
					<Button variant='secondary' type='submit' className={outlineStyle}>
						カスタマイズを登録
					</Button>
				</div>
			</form>
		</Form>
	);
}
