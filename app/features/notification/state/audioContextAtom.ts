import { atom } from "jotai";

export type AudioContextState = AudioContext | null;

export const audioContextAtom = atom<AudioContextState>(null);
