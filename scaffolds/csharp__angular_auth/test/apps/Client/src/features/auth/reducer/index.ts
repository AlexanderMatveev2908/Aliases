import { createReducer, on } from '@ngrx/store';
import { AuthActT } from './actions';

export interface AuthStateT {
  isLogged: boolean;
}

const initState: AuthStateT = {
  isLogged: false,
};

export const authReducer = createReducer(
  initState,
  on(AuthActT.RESET__AUTH_STATE, () => initState),
  on(AuthActT.SET_LOGGED, (_: AuthStateT, action: { val: boolean }) => ({ isLogged: action.val })),
);
