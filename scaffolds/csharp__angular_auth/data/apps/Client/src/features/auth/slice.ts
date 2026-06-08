import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { computed, Injectable, Signal } from '@angular/core';
import { AuthStateT } from './reducer';
import { getAuthState } from './reducer/selector';
import { AuthActT } from './reducer/actions';

@Injectable({ providedIn: 'root' })
export class AuthSlice extends UseKitSliceSvc {
  public get authState(): Signal<AuthStateT> {
    return this.store.selectSignal(getAuthState);
  }

  public readonly isLogged: Signal<boolean> = computed(() => this.authState().isLogged);

  public setLogged(val: boolean): void {
    this.store.dispatch(AuthActT.SET_LOGGED({ val }));
  }
}
