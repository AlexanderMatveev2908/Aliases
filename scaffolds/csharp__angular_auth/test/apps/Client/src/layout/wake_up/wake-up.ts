import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BgBlack } from '../bg_black/bg-black';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { UseWakeUpApi } from '@/features/wake_up/api';
import { finalize } from 'rxjs';
import { UsePlatformSvc } from '@/core/services/use_platform';

@Component({
  selector: 'app-wake-up',
  imports: [BgBlack, SpinBtn],
  providers: [UseApiTrackerHk],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WakeUp implements OnInit {
  private readonly useWakeUpApi: UseWakeUpApi = inject(UseWakeUpApi);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly useTracker: UseApiTrackerHk = inject(UseApiTrackerHk);

  ngOnInit(): void {
    if (this.usePlatform.isServer) return;

    this.useTracker.track(this.useWakeUpApi.wakeUp()).subscribe();
  }
}
