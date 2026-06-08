import { createAction, props } from '@ngrx/store';

export const SidebarActT = {
  RESET__SIDEBAR_STATE: createAction('RESET__SIDEBAR_STATE'),
  SET_SIDEBAR: createAction('SET_SIDEBAR', props<{ val: boolean }>()),
};
