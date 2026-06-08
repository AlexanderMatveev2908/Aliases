import { AppPayloadEventT, Nullable } from '@/common/types/general';
import { createReducer, on } from '@ngrx/store';
import { NoticeActT } from './actions';

export type NoticeTmptT = 'HOME' | 'MAIL';

export interface NoticeStateT extends AppPayloadEventT {
  cb: Nullable<() => void>;
  tmpt: Nullable<NoticeTmptT>;
}

const initState: NoticeStateT = {
  msg: '',
  status: 0,
  eventT: 'NONE',
  cb: null,
  tmpt: null,
};

export const noticeReducer = createReducer(
  initState,
  on(NoticeActT.RESET__NOTICE_STATE, () => initState),
  on(NoticeActT.SET_NOTICE, (_: NoticeStateT, action: NoticeStateT) => ({ ...action })),
);
