import { zodResolver } from "@hookform/resolvers/zod";
import type { SetStateAction } from "jotai";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import type { TimerAtomType } from "~/atom/atoms";
import type { SetAtom } from "~/atom/types";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import usePomodoro from "~/features/pomodoro/hooks/usePomodoro";

const MIN_COUNT_WARNING = "タイマーのカウントは1分以上である必要があります";
const MAX_COUNT_WARNING = "タイマーのカウントは60分以下である必要があります";

export const formValues = z.object({
    focus: z.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
    rest: z.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
})

export type IFormValues = z.infer<typeof formValues>;

type Props = {
    setTimer: SetAtom<[newValue: SetStateAction<TimerAtomType>], void>;
}

export function TimerForm(props: Props) {
    const {
        setFocusTime,
        setRestTime,
    } = usePomodoro();
    const {
        register,
        handleSubmit,
    } = useForm<IFormValues>({
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="focusTimerCount">集中する時間をカスタマイズ</label>
            <input type="number" {...register("focus",{ valueAsNumber: true})}/>
            <label htmlFor="restTimerCount">休憩する時間をカスタマイズ</label>
            <input type="number" {...register("rest", { valueAsNumber: true})}/>
            <button type="submit">
                登録
            </button>
        </form>
    )
}