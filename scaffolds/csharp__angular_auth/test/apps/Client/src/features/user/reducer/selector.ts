import { createFeatureSelector } from '@ngrx/store';
import { UserStateT } from '.';

export const getUserState = createFeatureSelector<UserStateT>('user');
