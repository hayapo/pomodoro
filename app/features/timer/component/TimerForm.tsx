import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";
import usePomodoro from "~/features/pomodoro/hooks/usePomodoro";

const MIN_COUNT_WARNING = "タイマーのカウントは1分以上である必要があります";
const MAX_COUNT_WARNING = "タイマーのカウントは60分以下である必要があります";

export const formValues = z.object({
    focusTimerCount: z.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
    restTimerCount: z.number().min(1, MIN_COUNT_WARNING).max(60, MAX_COUNT_WARNING),
})

export type IFormValues = z.infer<typeof formValues>;

export function TimerForm() {
    const { setFocusTime, setRestTime } = usePomodoro();
    const {
        register,
        handleSubmit,
    } = useForm<IFormValues>({
        resolver: zodResolver(formValues),
        defaultValues: {
            focusTimerCount: DEFAULT_FOCUS_TIMER_MINUTE,
            restTimerCount: DEFAULT_REST_TIMER_MINUTE,
        }
    })

    const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
        setFocusTime(data.focusTimerCount);
        setRestTime(data.restTimerCount);
        console.log(data.focusTimerCount);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="focusTimerCount">集中する時間をカスタマイズ</label>
            <input type="number" {...register("focusTimerCount",{ valueAsNumber: true})}/>
            <label htmlFor="restTimerCount">休憩する時間をカスタマイズ</label>
            <input type="number" {...register("restTimerCount", { valueAsNumber: true})}/>
            <button type="submit">
                登録
            </button>
        </form>
    )
}