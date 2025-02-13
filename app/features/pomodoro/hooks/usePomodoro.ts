import { useAtom, useAtomValue } from "jotai";
import { focusTimeAtom, pomodoroStateAtom, pomodoroTimesInSecondAtom, restTimeAtom } from "~/atom/atoms";

const usePomodoro = () => {
    const [focusTime, setFocusTime] = useAtom(focusTimeAtom);
    const [restTime, setRestTime] = useAtom(restTimeAtom);
    const pomodoroTimesInSecond = useAtomValue(pomodoroTimesInSecondAtom);

    return {
        focusTime,
        setFocusTime,
        restTime,
        setRestTime,
        pomodoroTimesInSecond,
    };
};

export default usePomodoro;