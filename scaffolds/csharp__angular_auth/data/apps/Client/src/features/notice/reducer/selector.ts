import { createFeatureSelector } from '@ngrx/store';
import { NoticeStateT } from '.';

export const getNoticeState = createFeatureSelector<NoticeStateT>('notice');
