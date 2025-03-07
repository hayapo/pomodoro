import { useEffect, useRef, useState } from "react";

type WorkerFunction<T, U> = (input: T) => U;

export const useWorker = <T, U>(workerFn: WorkerFunction<T, U>, input: T) => {
	const [result, setResult] = useState<U | null>(null);
	const workerRef = useRef<Worker | null>(null);

	useEffect(() => {
		const blob = new Blob(
      [
        `
          self.onmessage = async (e) => {
            const func = ${workerFn.toString()};
            const result = func(e.data);
            self.postMessage(result);
          };
        `,
      ],
      { type: "application/javascript" }
    );
		const worker = new Worker(URL.createObjectURL(blob));
		workerRef.current = worker;

		worker.onmessage = (e) => {
			setResult(e.data);
		};

		worker.postMessage(input);

		return () => {
			worker.terminate();
		};
	}, [workerFn, input]);

	return result;
}
