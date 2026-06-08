import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { AuthSlice } from '@/features/auth/slice';
import { UseUserApiSvc } from '@/features/user/api';
import { UserSlice } from '@/features/user/slice';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseFetchUserOnLogSvc extends UseInjCtxHk {
  private readonly userApi: UseUserApiSvc = inject(UseUserApiSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);

  public getUser(): void {
    this.useEffect(() => {
      if (this.authSlice.isLogged()) {
        this.userApi.getUser().subscribe((res) => {
          this.userSlice.setUser(res.data.user);
        });
      } else {
        this.userSlice.setUser(null);
      }
    });
  }
}
