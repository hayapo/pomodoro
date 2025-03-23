import { SITE_NAME } from "~/constants";
import { useState, useEffect, useCallback } from "react";
import { useAtomValue } from "jotai";
import { settingsAtom } from "~/features/customize/states/settingsAtom";

export const useNotifications = (audioSource: string) => {
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
	const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
	const { audioVolume: gainValue } = useAtomValue(settingsAtom);

		useEffect(() => {
			// AudioContext を作成
			const audioCtx = new window.AudioContext();
			setAudioContext(audioCtx);
	
			// 音声をロードしてデコードしておく
			const loadAudio = async () => {
				try {
					const response = await fetch(audioSource);
					const arrayBuffer = await response.arrayBuffer();
					const decodedData = await audioCtx.decodeAudioData(arrayBuffer);
					setAudioBuffer(decodedData);
				} catch (error) {
					console.error('Error fetching or decoding audio:', error);
				}
			};
	
			loadAudio();
	
			// アンマウント時などでクリーンアップ（AudioContextを閉じる）
			return () => {
				if (audioCtx && audioCtx.state !== 'closed') {
					audioCtx.close();
				}
			};
		}, [audioSource]);
	
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

	/**
   * 通知音を再生する関数
   * - ボタンなどから呼び出す
   */
		const playNotificationSound = useCallback(() => {
			if (!audioContext || !audioBuffer) {
				return;
			}
	
			// ソースノードを作成してバッファを設定
			const source = audioContext.createBufferSource();
			source.buffer = audioBuffer;
	
			// ゲインノードを作成して音量を設定
			const gainNode = audioContext.createGain();
			gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime); // 状態管理しているgainValueを使用
	
			// 接続: source -> gainNode -> audioContext.destination
			console.log(gainValue);
			source.connect(gainNode);
			gainNode.connect(audioContext.destination);
	
			// 再生開始
			source.start();
		}, [audioContext, audioBuffer, gainValue]);

	const sendNotification = useCallback((
		message: {
			title: string;
			body: string
		},
		tag: string
	) => {
		if ('Notification' in window) {
			new Notification(message.title, {
				body: message.body,
				tag: tag,
			});
		}
	}, []);

	return {
		requestPermission,
		sendNotification,
		playNotificationSound,
	}
};
