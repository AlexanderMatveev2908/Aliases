import { createAction, props } from '@ngrx/store';
import { WakeUpStateT } from '.';

export const WakeUpActT = {
  SET_LAST_CALL: createAction('SET_LAST_CALL', props<WakeUpStateT>()),
};
