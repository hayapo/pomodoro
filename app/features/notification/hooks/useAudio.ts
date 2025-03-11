import { useAtom } from "jotai";
import { audioContextAtom } from "../state/audioContextAtom"

export const useAudio = () => {
	const [audioContext, setAudioContext] = useAtom(audioContextAtom);
	if (!audioContext) {
		setAudioContext(new AudioContext());
	}
	return {

	}
}
