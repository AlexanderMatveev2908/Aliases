import { inject, Injectable } from '@angular/core';
import { WakeUpSlice } from './slice';
import { Nullable } from '@/common/types/general';
import { UseStorageSvc } from '@/core/services/use_storage';
import { ObsResT, ResApiT } from '@/common/types/api';
import { catchError, EMPTY, retry, tap, throwError, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastSlice } from '../toast/slice';
import { UseNavSvc } from '@/core/services/use_nav';
import { LibLog } from '@/core/lib/log';

@Injectable({ providedIn: 'root' })
export class UseWakeUpApi {
  private readonly wakeUpSlice: WakeUpSlice = inject(WakeUpSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  private readonly FIFTEEN_MIN: number = 1000 * 60 * 15;
  private readonly RETRY_DELAY: number = 2000;
  private readonly MAX_CALLS: number = 10;

  private setLastCall(): void {
    const now: number = Date.now();
    this.wakeUpSlice.setLastCall(now);
  }

  private shouldWakeUp(): boolean {
    const raw: Nullable<string> = this.useStorage.getItem('lastCall');
    const lastCall: number = Number(raw ?? 0);

    if (!Number.isFinite(lastCall) || lastCall <= 0) return true;

    return Date.now() - lastCall > this.FIFTEEN_MIN;
  }

  public wakeUp(): ObsResT<void> {
    if (!this.shouldWakeUp()) return EMPTY;

    return this.http.get<ResApiT<void>>('/wake-up').pipe(
      retry({
        count: this.MAX_CALLS,
        delay: (err, retryCount) => {
          LibLog.main(`Retry ${retryCount}/${this.MAX_CALLS}`, err);

          return timer(this.RETRY_DELAY);
        },
      }),
      tap(() => {
        this.toastSlice.openToast({
          eventT: 'OK',
          status: 200,
          msg: 'Server waked up',
        });

        this.setLastCall();
      }),
      catchError((err) => {
        this.useNav.pushNotice({
          cb: null,
          tmpt: null,
          eventT: 'ERR',
          msg: 'Internal Server Error',
          status: 500,
        });

        this.toastSlice.openToast({
          eventT: 'ERR',
          msg: 'Internal Server Error',
          status: 500,
        });

        return throwError(() => err);
      }),
    );
  }
}
