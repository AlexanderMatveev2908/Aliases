import { ObsResT, ResApiT } from '@/common/types/api';
import { UseKitApiSvc } from '@/core/services/use_kit_api';
import { inject, Injectable } from '@angular/core';
import { UserT } from './reducer';
import { LibApiArgs } from '@/core/lib/api/args';
import { tap } from 'rxjs';
import { UserSlice } from './slice';

type UserResT = {
  user: UserT;
};

@Injectable({ providedIn: 'root' })
export class UseUserApiSvc extends UseKitApiSvc {
  private readonly userSlice: UserSlice = inject(UserSlice);

  public getUser(): ObsResT<UserResT> {
    return this.api.get<UserResT, void>(
      LibApiArgs.withURL<void>('/user').noToast().pushOnStatus([404]),
    );
  }
}
