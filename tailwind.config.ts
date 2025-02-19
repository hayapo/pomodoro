import type { Config } from "tailwindcss";

export default {
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
			'seggreen': '#00FF00',
			'segblue': '#008080',
		}
	}
    }
} satisfies Config;
