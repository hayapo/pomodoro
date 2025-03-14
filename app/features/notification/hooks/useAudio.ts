import { useCallback, useEffect, useState } from "react";

export const useAudio = (url: string, initialGain = 0.5) => {
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [gainValue, setGainValue] = useState(initialGain);


  useEffect(() => {
    // AudioContext を作成
    const audioCtx = new window.AudioContext();
    setAudioContext(audioCtx);

    // 音声をロードしてデコードしておく
    const loadAudio = async () => {
      try {
        const response = await fetch(url);
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
  }, [url]);

  /**
   * 音声を再生する関数
   * - ボタンなどから呼び出す
   */
  const play = useCallback(() => {
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
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 再生開始
    source.start();
  }, [audioContext, audioBuffer, gainValue]);

	return {
		play,
		gainValue,
		setGainValue
	}
}
