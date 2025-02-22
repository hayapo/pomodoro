import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const showPomodoroTextAtom = atomWithStorage('showPomodoroText', false, undefined, { getOnInit: true });
