import { createReducer, on } from '@ngrx/store';
import { WakeUpActT } from './actions';

export interface WakeUpStateT {
  lastCall: number;
}

const initState: WakeUpStateT = {
  lastCall: 0,
};

export const wakeUpReducer = createReducer(
  initState,
  on(WakeUpActT.SET_LAST_CALL, (_: WakeUpStateT, action: WakeUpStateT) => ({ ...action })),
);
