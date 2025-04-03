import type { Config } from "tailwindcss";
import { Colors } from "./app/features/customize/types/colors";

export default {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		"./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"
	],
	colors: {
	},
	plugins: [require("tailwindcss-animate")],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				[Colors.Green]: '#00FF00',
				segblue: '#008080',
				'hotpink': '#ff69b4',
				'mediumslateblue': '#7b68ee',
				// 全体的な背景色
				background: "hsl(var(--background))",
				// 全体的な文字色
				foreground: "hsl(var(--foreground))",
			}
		}	
	}
} satisfies Config;
