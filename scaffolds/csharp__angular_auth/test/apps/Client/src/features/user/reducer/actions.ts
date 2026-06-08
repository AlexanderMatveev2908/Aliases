import { createAction, props } from '@ngrx/store';
import { UserT } from '.';
import { Nullable } from '@/common/types/general';

export const UserActT = {
  RESET__USER_STATE: createAction('RESET__USER_STATE'),
  SET_USER: createAction('SET_USER', props<{ user: Nullable<UserT> }>()),
};
