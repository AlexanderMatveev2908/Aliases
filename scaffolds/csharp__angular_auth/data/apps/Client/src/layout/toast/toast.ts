import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { ElDomT, RefDomT } from '@/common/types/dom';
import { AppEventT, SvgT } from '@/common/types/general';
import { UseMetaEventSvc } from '@/core/services/use_meta_event';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { TxtDom } from '@/core/lib/dom/txt';
import { ToastStateT } from '@/features/toast/reducer';
import { ToastSlice } from '@/features/toast/slice';
import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EffectRef,
  HostListener,
  inject,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { UseAnimationsDir } from './etc/animations_dir';
import { UseToastTrimDir } from './etc/trim_dir';

@Component({
  selector: 'app-toast',
  imports: [NgComponentOutlet],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast extends UseToastTrimDir implements AfterViewInit {
  public readonly useMeta: UseMetaEventSvc = inject(UseMetaEventSvc);

  public readonly SvgClose: SvgT = SvgFillClose;

  public readonly eventApp: Signal<AppEventT> = computed(() => this.toastState().eventT);

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    this.setTrimEffect();
    this.handleAnimationDir();
  }
}
