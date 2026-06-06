import { createAction, props } from '@ngrx/store';

export const WakeUpActT = {
  RESET__WAKE_UP_STATE: createAction('RESET__WAKE_UP_STATE'),
  SET_LAST_CALL: createAction('SET_LAST_CALL', props<{ val: number }>()),
};
