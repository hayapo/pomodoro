import type { MetaFunction } from "@remix-run/node";
import Timer from "~/features/Timer/component/Timer";
import { TimerFormDrawer } from "~/features/TimerForm/component/TimerFormDrawer";

export const meta: MetaFunction = () => {
  return [
    { title: "Segment Pomodoro Timer" },
    { name: "description", content: "ポモドーロタイマーを広告フリーで使いたい人による、ポモドーロタイマーを広告フリーで使いたい人のための、ポモドーロタイマーを広告フリーで使えるサイト" },
  ];
};

export default function Index() {
  return (
    <>
      <h1 className="p-4 text-3xl font-bold">Pomodoro Timer</h1>
      <div className="max-h-svh flex flex-col items-center justify-center gap-20">
        <Timer />
        <TimerFormDrawer />
      </div>
    </>
  );
}