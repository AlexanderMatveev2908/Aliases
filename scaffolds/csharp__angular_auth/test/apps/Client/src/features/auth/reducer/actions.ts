import { createAction, props } from '@ngrx/store';

export const AuthActT = {
  RESET__AUTH_STATE: createAction('RESET__AUTH_STATE'),
  SET_LOGGED: createAction('SET_LOGGED', props<{ val: boolean }>()),
};
