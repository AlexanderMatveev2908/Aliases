import { ObsResT } from '@/common/types/api';
import { UseApiSvc } from '@/core/api';
import { LibApiArgs } from '@/core/lib/api/args_api';
import { UseStorageSvc } from '@/core/services/use_storage';
import { inject, Injectable } from '@angular/core';
import { WakeUpSlice } from './slice';
import { delay, EMPTY, Observable, retry, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WakeUpApiSvc {
  private readonly api: UseApiSvc = inject(UseApiSvc);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly wakeUpSlice: WakeUpSlice = inject(WakeUpSlice);

  private readonly TEN_MIN: number = 10 * 60 * 1000;
  private readonly RETRY_DELAY: number = 2000;

  private saveLastCall(): void {
    const now: number = Date.now();

    this.wakeUpSlice.setLastCall(now);
    this.useStorage.setItem('lastCall', now);
  }

  private shouldWakeUp(): boolean {
    const raw: string | null = this.useStorage.getItem('lastCall');
    const lastCall: number = Number(raw ?? 0);

    if (!Number.isFinite(lastCall) || lastCall <= 0) return true;

    return Date.now() - lastCall > this.TEN_MIN;
  }

  public wakeUp(): ObsResT<void> {
    if (!this.shouldWakeUp()) return EMPTY;

    return this.api.get(LibApiArgs.withURL('/wake-up').toastOnFulfilled()).pipe(
      retry({
        delay: () => timer(this.RETRY_DELAY),
      }),
      tap(() => this.saveLastCall()),
    );
  }
}
