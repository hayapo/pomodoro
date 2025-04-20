import { useAtomValue } from "jotai"
import { settingsAtom } from "../states/settingsAtom"
import type { Colors } from "../types/colors";

export const useColors = () => {
	const { primaryColor } = useAtomValue(settingsAtom);
	const bgColor = 'bg'.concat('-', primaryColor);
	const cssNamedColor = primaryColor;

	const convertToBgColor = (p: Colors) => {
		return 'bg'.concat('-', p)
	}

	return { bgColor, cssNamedColor, convertToBgColor  }
}
