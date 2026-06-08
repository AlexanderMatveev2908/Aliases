import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { Injectable, Signal } from '@angular/core';
import { SidebarStateT } from './reducer';
import { getSidebarState } from './reducer/selector';
import { SidebarActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class SidebarSlice extends UseKitSliceSvc {
  public get sidebarState(): Signal<SidebarStateT> {
    return this.store.selectSignal(getSidebarState);
  }

  public toggleSidebar(): void {
    this.store.dispatch(SidebarActT.SET_SIDEBAR({ val: !this.sidebarState().isOpen }));
  }
}
