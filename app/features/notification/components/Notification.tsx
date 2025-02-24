import { useEffect } from "react";
import { useNotifications } from "../hooks/useNotifications";

export function Notification() {
	const { requestPermission } = useNotifications();
	useEffect(() => {
		requestPermission();
	},
	[requestPermission],
	);
	return null;
}
