import { computed, Injectable, Signal } from '@angular/core';
import { UserStateT, UserT } from './reducer';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { getUserState } from './reducer/selector';
import { UserActT } from './reducer/actions';
import { Nullable } from '@/common/types/general';

@Injectable({ providedIn: 'root' })
export class UserSlice extends UseKitSliceSvc {
  public get userState(): Signal<UserStateT> {
    return this.store.selectSignal(getUserState);
  }

  public setUser(user: Nullable<UserT>): void {
    this.store.dispatch(UserActT.SET_USER({ user }));
  }

  public readonly user: Signal<Nullable<UserT>> = computed(() => this.userState().user);
}
