import type { MutableRefObject } from "react";
import type { TimerEventDataType } from "../lib/timerWorker";

export const useTimerWorkerCommand = (workerRef: MutableRefObject<Worker | null>) => {
	const start = (count: number) => {
		if (!workerRef.current) {
			return;
		}
		workerRef.current.postMessage({ command: 'start', count: count});
	}
	const stop = () => {
		if (!workerRef.current) {
			return;
		}
		workerRef.current.postMessage({ command: 'stop'});
	};
	const terminate = () => {
		if (!workerRef.current) {
			return;
		}
		workerRef.current.terminate();
	}

	return {
		start,
		stop,
		terminate,
	}
}
