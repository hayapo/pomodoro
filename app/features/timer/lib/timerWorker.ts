import type { WorkerCommandType } from "../types/workerCommandType";

let timerId: NodeJS.Timeout | undefined;

self.onmessage = (event) => {
	console.log("worker setted");
	const { command, count } = event.data;
	const typedCommand = command as WorkerCommandType;

	if (typedCommand === 'start') {
		timerId = setInterval(() => {
			if (timerId) {
				return;
			}
			const newCount = count - 1;
			self.postMessage({ newCount });
			if (count <= 0) {
        clearInterval(timerId);
        timerId = undefined;
      }
		}, 1000)
	} else if (command === "stop") {
    clearInterval(timerId);
    timerId = undefined;
  }
}
