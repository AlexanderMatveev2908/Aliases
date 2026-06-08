import { createFeatureSelector } from '@ngrx/store';
import { AuthStateT } from '.';

export const getAuthState = createFeatureSelector<AuthStateT>('auth');
