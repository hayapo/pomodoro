import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: 'Hello' },
        { name: 'description', content: 'Hello, how are u' },
    ];
}

export default function Index() {
    return (
        <div className="max-w-screen-xl">
            <div className='text-2xl text-white'>Hello</div>
        </div>
    );
}