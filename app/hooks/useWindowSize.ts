import { useLayoutEffect, useState } from "react";

type Size = {
	width: number;
	height: number;
}

export const useWindowSize = () => {
	const [size, setSieze] = useState<Size>({width: 0, height: 0});
	useLayoutEffect(() => {
		const updateSize = () => {
			setSieze({width: window.innerWidth, height: window.innerHeight});
		};

		window.addEventListener('resize', updateSize);
		updateSize();

		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return { size };
}
