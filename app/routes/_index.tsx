import type { MetaFunction } from '@remix-run/node';
import { Page } from '~/components/pages/top/Page';
import { SITE_NAME } from '~/constants';

export const meta: MetaFunction = () => {
	return [
		{ title: SITE_NAME },
		{
			name: 'description',
			content:
				'ポモドーロタイマーを広告フリーで使いたい人による、ポモドーロタイマーを広告フリーで使いたい人のための、ポモドーロタイマーを広告フリーで使えるサイト',
		},
	];
};

export default Page;
