import type { MetaFunction } from '@remix-run/node';
import { Page } from '~/components/pages/top/Page';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Segment Pomodoro Timer' },
		{
			name: 'description',
			content:
				'ポモドーロタイマーを広告フリーで使いたい人による、ポモドーロタイマーを広告フリーで使いたい人のための、ポモドーロタイマーを広告フリーで使えるサイト',
		},
	];
};

export default Page;
