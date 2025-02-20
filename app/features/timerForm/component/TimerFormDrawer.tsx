import { Button } from "~/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerPortal } from "~/components/ui/drawer";
import { TimerForm } from "./TimerForm";
import usePomodoroTimer from "~/features/timer/hooks/usePomodoroTimer";
import { outlineStyle } from "~/lib/utils";
import clsx from "clsx";

export function TimerFormDrawer() {
    const { setTimer } = usePomodoroTimer();
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant='outline' className={clsx(outlineStyle, 'w-[150px] p-6')}>タイマーをカスタマイズ</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>
                            タイマーをカスタマイズする
                        </DrawerTitle>  
                        <DrawerDescription>
                            集中する時間と休憩する時間を分単位でカスタマイズすることができます
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <TimerForm setTimer={setTimer}/>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                variant='outline'
                                className={clsx(outlineStyle)}>
                                    閉じる
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}