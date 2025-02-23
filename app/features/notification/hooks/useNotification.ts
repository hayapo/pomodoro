export const useNotification = () => {
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
						new Notification('test', {
							body: 'test'
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
		function onNotificationShowed() {
			console.log('notification has sent');
		}
		if ('Notification' in window) {
			const notification = new Notification(message.title, {
				body: message.body,
				tag: tag,
			});
			notification.addEventListener('show', onNotificationShowed)
			return notification.removeEventListener('show', onNotificationShowed)
		}
		return;
	}
	return {
		requestPermission,
		sendNotification,
	}
}
