import { useEffect } from "react";
import { useNotification } from "../hooks/useNotification";

export function Notification() {
	const { requestPermission } = useNotification();
	useEffect(() => {
		requestPermission();
	},
	[requestPermission],
	);
	return null;
}
