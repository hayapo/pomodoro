import { atom } from "jotai";
import type { MutableRefObject } from "react";

export type WorkerRefState = MutableRefObject<Worker | null>;

export const WorkerRefAtom = atom<WorkerRefState | null>(null);
