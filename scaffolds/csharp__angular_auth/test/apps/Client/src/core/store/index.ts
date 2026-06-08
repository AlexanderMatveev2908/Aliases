import { authReducer, AuthStateT } from '@/features/auth/reducer';
import { noticeReducer, NoticeStateT } from '@/features/notice/reducer';
import { sidebarReducer, SidebarStateT } from '@/features/sidebar/reducer';
import { toastReducer, ToastStateT } from '@/features/toast/reducer';
import { userReducer, UserStateT } from '@/features/user/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  toast: ToastStateT;
  notice: NoticeStateT;
  sidebar: SidebarStateT;
  auth: AuthStateT;
  user: UserStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  toast: toastReducer,
  notice: noticeReducer,
  sidebar: sidebarReducer,
  auth: authReducer,
  user: userReducer,
};
