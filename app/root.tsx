import type { LinksFunction } from '@remix-run/node';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import sytles from './tailwind.css?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: sytles }];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body className='h-svh w-screen-xl w-full'>
				<h1 className='p-4 text-3xl font-bold'>Pomodoro Timer</h1>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
