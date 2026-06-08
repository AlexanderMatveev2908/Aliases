import { createReducer, on } from '@ngrx/store';
import { SidebarActT } from './actions';

export interface SidebarStateT {
  isOpen: boolean;
}

const initState: SidebarStateT = {
  isOpen: false,
};

export const sidebarReducer = createReducer(
  initState,
  on(SidebarActT.RESET__SIDEBAR_STATE, () => initState),
  on(SidebarActT.SET_SIDEBAR, (_: SidebarStateT, action: { val: boolean }) => ({
    isOpen: action.val,
  })),
);
