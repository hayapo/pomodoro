import type { MetaFunction } from "@remix-run/node";
import Timer from "~/features/timer/component/Timer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen max-w-screen-xl w-full">
      <h1 className="p-4 text-3xl font-bold">Pomodoro Timer</h1>
      <div className="h-screen flex items-center justify-center">
        <Timer />
      </div>
    </div>
  );
}