import { SITE_NAME } from "~/constants";
import { useAudio } from "./useAudio";

export const useNotifications = () => {
	const { play } = useAudio('./pigeon-clock.mp3');
	const requestPermission = () => {
		if ('Notification' in window) {
			const permission = Notification.permission;
			if (permission === 'denied' || permission === 'granted') {
				console.log(`permission has already ${permission}`)
				return;
			}
			Notification.requestPermission()
				.then(
					(permission) => {
					if (permission === 'granted') {
						console.log('Notification permission granted.');
						new Notification(SITE_NAME, {
							body: 'このサイトから通知を送信します。\n正しく通知を受け取るために、OS設定からお使いのブラウザの通知を許可してください'
						});
					}
				}
			)
		}
	};

	const sendNotification = (
		message: {
			title: string;
			body: string
		},
		tag: string
	) => {
		if ('Notification' in window) {
			const notification = new Notification(message.title, {
				body: message.body,
				tag: tag,
			});
		}
	};

	const playNotificationSound = () => {
		play();
	};

	return {
		requestPermission,
		sendNotification,
		playNotificationSound,
	}
};
