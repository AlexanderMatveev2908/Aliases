import { inject, Injectable } from '@angular/core';
import { AuthSlice } from './slice';
import { ObsResT, ResApiT } from '@/common/types/api';
import { UserT } from '../user/reducer';
import { UseApiSvc } from '@/core/api';
import { LibApiArgs } from '@/core/lib/api/args';
import { UseStorageSvc } from '@/core/services/use_storage';
import { tap } from 'rxjs';
import { RegisterFormT } from './register/paperwork';
import { UseNavSvc } from '@/core/services/use_nav';
import { UseKitApiSvc } from '@/core/services/use_kit_api';
import { LoginFormT } from './login/paperwork';

type RegisterResT = {
  accessToken: string;
  newUser: UserT;
};

type LoginResT = {
  accessToken: string;
};

@Injectable({
  providedIn: 'root',
})
export class UseAuthApiSvc extends UseKitApiSvc {
  public readonly authSlice: AuthSlice = inject(AuthSlice);

  public register(body: RegisterFormT): ObsResT<RegisterResT> {
    return this.api
      .post<
        RegisterResT,
        RegisterFormT
      >(LibApiArgs.withURL<RegisterFormT>('/auth/register').body(body).toastOnFulfilled())
      .pipe(
        tap((res: ResApiT<RegisterResT>) => {
          this.useStorage.setItem('accessToken', res.data.accessToken);
          this.authSlice.setLogged(true);
          this.useNav.replace('/', { from: null });
        }),
      );
  }

  public login(data: LoginFormT): ObsResT<LoginResT> {
    return this.api
      .post<
        LoginResT,
        LoginFormT
      >(LibApiArgs.withURL<LoginFormT>('/auth/login').body(data).toastOnFulfilled())
      .pipe(
        tap((res: ResApiT<LoginResT>) => {
          this.useStorage.setItem('accessToken', res.data.accessToken);
          this.authSlice.setLogged(true);
          this.useNav.replace('/', { from: null });
        }),
      );
  }

  public logout(): ObsResT<void> {
    return this.api.post(LibApiArgs.withURL('/auth/logout').toastOnFulfilled()).pipe(
      tap((res: ResApiT<void>) => {
        this.useStorage.removeItem('accessToken');
        this.authSlice.setLogged(false);
        this.useNav.replace('/', { from: null });
      }),
    );
  }

  public getProtectedData(): ObsResT<void> {
    return this.api.get(LibApiArgs.withURL('/auth/protected').toastOnFulfilled());
  }

  public refreshToken(): ObsResT<LoginResT> {
    return this.api.post<LoginResT, void>(LibApiArgs.withURL<void>('/auth/refresh').noToast());
  }
}
