import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { WakeUpApiSvc } from '@/features/wake_up/api';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Signal,
} from '@angular/core';
import { BgBlack } from '../bg_black/bg-black';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wake-up',
  imports: [BgBlack, SpinBtn],
  providers: [UseApiTrackerHk],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp {
  private readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  private readonly wakeUpApi: WakeUpApiSvc = inject(WakeUpApiSvc);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.useApiTracker
      .track(this.wakeUpApi.wakeUp())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public readonly isBlack: Signal<boolean> = computed(() => this.useApiTracker.isPending());
}
