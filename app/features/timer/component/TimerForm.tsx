import { zodResolver } from "@hookform/resolvers/zod";
import type { SetStateAction } from "jotai";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { TimerAtomType } from "~/atom/atoms";
import type { SetAtom } from "~/atom/types";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import usePomodoro from "~/features/pomodoro/hooks/usePomodoro";

const MIN_COUNT_WARNING = "タイマーのカウントは1分以上である必要があります";
const MAX_COUNT_WARNING = "タイマーのカウントは60分以下である必要があります";

export const formValues = z.object({
    focus: z.coerce.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
    rest: z.coerce.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
})

export type IFormValues = z.infer<typeof formValues>;

type Props = {
    setTimer: SetAtom<[newValue: SetStateAction<TimerAtomType>], void>;
}

// TODO: カスタマイズフォームはDrawerとかPopover, Dialogを使って常時表示しないようにするのが良いかも
export function TimerForm(props: Props) {
    const {
        setFocusTime,
        setRestTime,
    } = usePomodoro();
    const form = useForm<IFormValues>({
        resolver: zodResolver(formValues),
        defaultValues: {
            focus: DEFAULT_FOCUS_TIMER_MINUTE,
            rest: DEFAULT_REST_TIMER_MINUTE,
        }
    })

    const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
        setFocusTime(data.focus);
        setRestTime(data.rest);
        props.setTimer(
            {
                paused: true,
                pomodoroState: 'focus',
                count: data.focus,
            }
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='w-[15rem] flex flex-col gap-4 overflow-auto'>
                    <FormField
                        control={form.control}
                        name='focus'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>集中する時間 (min) をカスタマイズ</FormLabel>
                                <FormControl>
                                    <Input
                                        className='focus-visible:border-2 focus-visible:border-seven-segment-green'
                                        placeholder="25"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                    分単位（1~60）
                                </FormDescription> */}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='rest'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>休憩する時間 (min) をカスタマイズ</FormLabel>
                                <FormControl>
                                    <Input
                                        className='focus-visible:border-2 focus-visible:border-seven-segment-green'
                                        placeholder="25"
                                        {...field}
                                        />
                                </FormControl>
                                {/* <FormDescription>
                                    分単位（1~60）
                                </FormDescription> */}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className='focus-visible:border-2 focus-visible:border-seven-segment-green'
                    >
                            タイマーをセット
                    </Button>
                </div>
            </form>
        </Form>
    )
}