import { useAtom } from "jotai";
import { focusTimeAtom, pomodoroStateAtom, restTimeAtom } from "~/atom/atoms";

const usePomodoro = () => {
    const [focusTime, setFocusTime] = useAtom(focusTimeAtom);
    const [restTime, setRestTime] = useAtom(restTimeAtom);
    const [pomodoroState, setPomodoroState] = useAtom(pomodoroStateAtom);

    return {
        focusTime,
        setFocusTime,
        restTime,
        setRestTime,
        pomodoroState,
        setPomodoroState,
    };
};

export default usePomodoro;