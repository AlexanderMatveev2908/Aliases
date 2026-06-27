import { AppPayloadEventT, Nullable, WithIdT } from '@/common/types/general';
import { createReducer, on } from '@ngrx/store';
import { ToastActT } from './actions';
import { v4 } from 'uuid';

export interface ToastStateT extends AppPayloadEventT {
  currID: Nullable<string>;
  prevID: Nullable<string>;
  isToast: boolean;
}

const initState: ToastStateT = {
  msg: '',
  status: 0,
  eventT: 'NONE',
  currID: null,
  prevID: null,
  isToast: false,
};

export const toastReducer = createReducer(
  initState,
  on(ToastActT.RESET__TOAST_STATE, () => initState),
  on(ToastActT.OPEN_TOAST, (state: ToastStateT, action: AppPayloadEventT) => ({
    prevID: state.currID,
    currID: v4(),
    eventT: action.eventT,
    msg: action.msg,
    status: action.status,
    isToast: true,
  })),
  on(ToastActT.SET_ID, (state: ToastStateT, action: WithIdT<object>) => ({
    ...state,
    prevID: state.currID,
    currID: action.id,
  })),
  on(ToastActT.CLOSE_TOAST, (state: ToastStateT) => ({
    ...state,
    prevID: state.currID,
    currID: null,
    isToast: false,
  })),
);
