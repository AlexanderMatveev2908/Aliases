import { createFeatureSelector } from '@ngrx/store';
import { ToastStateT } from '.';

export const getToastState = createFeatureSelector<ToastStateT>('toast');
