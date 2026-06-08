import { createFeatureSelector } from '@ngrx/store';
import { WakeUpStateT } from '.';

export const getWakeUpState = createFeatureSelector<WakeUpStateT>('wakeUp');
