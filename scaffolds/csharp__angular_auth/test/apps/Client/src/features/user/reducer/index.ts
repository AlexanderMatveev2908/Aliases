import { Nullable } from '@/common/types/general';
import { createReducer, on } from '@ngrx/store';
import { UserActT } from './actions';

export interface UserT {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isTrainer: boolean;
}

export interface UserStateT {
  user: Nullable<UserT>;
}

const initState: UserStateT = {
  user: null,
};

export const userReducer = createReducer(
  initState,
  on(UserActT.RESET__USER_STATE, () => initState),
  on(UserActT.SET_USER, (_: UserStateT, action: { user: Nullable<UserT> }) => ({
    ..._,
    user: action.user,
  })),
);
