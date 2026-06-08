import { OrNone } from '@/common/types/general';
import { UseStorageSvc } from '@/core/services/use_storage';
import { AuthSlice } from '@/features/auth/slice';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseLogOnMountSvc {
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  public main() {
    const accessToken: OrNone<string> = this.useStorage.getItem('accessToken');

    if (accessToken) this.authSlice.setLogged(true);
  }
}
