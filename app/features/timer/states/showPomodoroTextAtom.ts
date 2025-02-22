import { atomWithStorage } from 'jotai/utils';

export const showPomodoroTextAtom = atomWithStorage('showPomodoroText', false, undefined, { getOnInit: true });
