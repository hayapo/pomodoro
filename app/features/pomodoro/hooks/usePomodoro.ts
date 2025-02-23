import { useAtom, useAtomValue } from 'jotai';
import { pomodoroTimesInSecondAtom } from '../states/pomodoroTimesInSecondAtom';

const usePomodoro = () => {
	const pomodoroTimesInSecond = useAtomValue(pomodoroTimesInSecondAtom);

	return {
		pomodoroTimesInSecond,
	};
};

export default usePomodoro;
