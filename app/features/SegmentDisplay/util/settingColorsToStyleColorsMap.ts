import type { Colors } from "~/features/customize/types/colors";

export type ColorSet = {
	css: string;
	tailwind: string;
}

export const settingsColorsToStyleColorsMap = (settingsColor: Colors) => {
	switch(settingsColor) {
		case "red":
			return "red"
		case "green":
			return "lime"
		case "blue":
			return "teal"
		case "pink":
			return "pink"
	}
}
