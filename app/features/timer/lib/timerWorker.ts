let timerId: NodeJS.Timeout | undefined;

type TimerEventDataType = {
	command: 'start' | 'stop';
	count: number;
}

self.onmessage = (event: MessageEvent<TimerEventDataType>) => {
	console.log("worker setted");
	const { command, count: _count } = event.data;
	let count = _count;

	if (command === 'start') {
		console.log('timer start');
		timerId = setInterval(() => {
			console.log(count);
			count = count - 1;
			self.postMessage({ count: count });
			if (count <= 0) {
				clearInterval(timerId);
        timerId = undefined;
      }
		}, 1000);
	} else if (command === "stop") {
    clearInterval(timerId);
    timerId = undefined;
  }
}

export default {};
