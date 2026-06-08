import { createFeatureSelector } from '@ngrx/store';
import { SidebarStateT } from '.';

export const getSidebarState = createFeatureSelector<SidebarStateT>('sidebar');
