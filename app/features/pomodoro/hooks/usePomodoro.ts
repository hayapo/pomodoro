import { useAtom, useAtomValue } from 'jotai';
import { pomodoroTimesAtom } from '~/features/pomodoro/states/pomodoroTimesAtom';
import { pomodoroTimesInSecondAtom } from '../states/pomodoroTimesInSecondAtom';

const usePomodoro = () => {
	const [pomodoroTimes, setPomodoroTimes] = useAtom(pomodoroTimesAtom);
	const pomodoroTimesInSecond = useAtomValue(pomodoroTimesInSecondAtom);

	return {
		pomodoroTimes,
		setPomodoroTimes,
		pomodoroTimesInSecond,
	};
};

export default usePomodoro;
