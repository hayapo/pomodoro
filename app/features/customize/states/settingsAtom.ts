import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DEFAULT_FOCUS_TIMER_MINUTE, DEFAULT_REST_TIMER_MINUTE } from "~/features/pomodoro/constants";

export type GeneralSettings = {
	arrowPlayNotificationSound: boolean;
	showPomodoroText: boolean;
	arrowSendNotification: boolean;
	audioVolume: number;
};

export type PomodoroSettings = {
	focusMinute: number;
	restMinute: number;
};

export type Settings = GeneralSettings & PomodoroSettings

export const settingsAtom = atomWithStorage<Settings>(
	'settings',
	{
		arrowSendNotification: true,
		arrowPlayNotificationSound: false,
		showPomodoroText: true,
		focusMinute: DEFAULT_FOCUS_TIMER_MINUTE,
		restMinute: DEFAULT_REST_TIMER_MINUTE,
		audioVolume: 0.5,
	},
	undefined,
	{
		getOnInit: true,
	}
);
