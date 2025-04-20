import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Colors } from '~/features/customize/types/colors';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const outlineStyle = clsx(
	'focus-visible:outline-4',
	'focus-visible:outline-seggreen',
	'focus-visible:ring-0',
);

export const getStyleWithPrimaryColor = (style: ClassValue, primaryColor: Colors) => {
	switch(primaryColor) {
		case 'lime':
			return cn(style, 'bg-lime');
		case 'mediumslateblue':
			return cn(style, 'bg-mediumslateblue');
		case 'hotpink':
			return cn(style, 'bg-hotpink');
	}
}
