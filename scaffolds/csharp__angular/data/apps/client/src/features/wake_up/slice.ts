import { Injectable, Signal } from '@angular/core';
import { WakeUpStateT } from './reducer';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { getWakeUpState } from './reducer/selector';
import { WakeUpActT } from './reducer/actions';

@Injectable({
  providedIn: 'root',
})
export class WakeUpSlice extends UseKitSliceSvc {
  public get wakeUpState(): Signal<WakeUpStateT> {
    return this.store.selectSignal(getWakeUpState);
  }

  public setLastCall(lastCall: number): void {
    this.store.dispatch(WakeUpActT.SET_LAST_CALL({ lastCall }));
  }
}
