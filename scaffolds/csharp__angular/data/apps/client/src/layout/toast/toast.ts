import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { ElDomT, RefDomT } from '@/common/types/dom';
import { Optional, TimerIdT } from '@/common/types/general';
import { LibTimer } from '@/core/lib/data_structures/timer';
import { LibMetaEvent } from '@/core/lib/meta_event';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { ToastStateT } from '@/features/toast/reducer';
import { ToastSlice } from '@/features/toast/slice';
import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  EffectRef,
  HostListener,
  inject,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ToastAnimations } from './animations';
import { TxtDom } from '@/core/lib/dom/txt';
import { ErrApp } from '@/core/lib/errApp';

@Component({
  selector: 'app-toast',
  imports: [NgComponentOutlet],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast implements AfterViewInit {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private timerID: TimerIdT = null;

  public readonly toastAnimations: ToastAnimations = inject(ToastAnimations);
  public readonly SvgFillClose = SvgFillClose;
  public readonly toastState: Signal<ToastStateT> = computed(() => this.toastSlice.toastState());
  public readonly mainColor: Signal<string> = computed(() =>
    LibMetaEvent.cssVarByT(this.toastState().eventT),
  );

  @ViewChild('toast') toast: RefDomT;
  @ViewChild('timerToast') timerToast: RefDomT;
  @ViewChild('msgContainer') msgContainer: RefDomT;

  public readonly trimmedMsg: WritableSignal<string> = signal('');
  private hasOpenedOnce = false;

  private setCutMsg(): void {
    const msg: string = this.toastState().msg;
    const MAX_LINES = 2;

    const elDOM: ElDomT = this.msgContainer?.nativeElement;
    if (!elDOM) return;

    this.trimmedMsg.set(TxtDom.binaryTrim(msg, { el: elDOM, maxLines: MAX_LINES }));
  }

  private clearTmr(): void {
    this.timerID = LibTimer.clear(this.timerID);
  }

  public closeClick(): void {
    this.clearTmr();
    this.toastSlice.closeToast();
  }
  public programClose(): void {
    const IN_ANIMATION_LAST: number = 5000;

    this.timerID = setTimeout(() => {
      this.closeClick();
    }, IN_ANIMATION_LAST);
  }
  private handleToastOpen(toastEl: HTMLElement, toastTimerEl: HTMLElement): void {
    const OUT_ANIMATION_LAST: number = 300;

    if (!this.toastState().prevID) {
      this.toastAnimations.toastIn(toastEl, toastTimerEl);
      this.programClose();
    } else {
      this.clearTmr();
      this.toastAnimations.toastOut(toastEl, toastTimerEl);

      setTimeout(() => {
        this.toastAnimations.toastIn(toastEl, toastTimerEl);
        this.programClose();
      }, OUT_ANIMATION_LAST);
    }
  }

  private handleToastClose(toastEl: HTMLElement, toastTimerEl: HTMLElement): void {
    this.clearTmr();
    this.toastAnimations.toastOut(toastEl, toastTimerEl);
  }

  public timerEffect?: EffectRef;
  public trimEffect?: EffectRef;

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    this.setCutMsg();

    this.usePlatform.inGlobalCtx(() => {
      this.trimEffect = effect(() => {
        const state = this.toastState();
        void state.msg;

        this.setCutMsg();
      });

      this.timerEffect = effect(() => {
        const state = this.toastState();

        const toastEl = this.toast?.nativeElement;
        const toastTimerEl = this.timerToast?.nativeElement;

        if (!this.usePlatform.isClient || !toastEl || !toastTimerEl) return;

        if (state.isToast && state.currID) {
          this.handleToastOpen(toastEl, toastTimerEl);
          this.hasOpenedOnce = true;
        } else if (!state.isToast && this.hasOpenedOnce) {
          this.handleToastClose(toastEl, toastTimerEl);
        }
      });
    });
  }

  @HostListener('window:resize')
  onresize(): void {
    if (!this.usePlatform.isClient) return;

    this.setCutMsg();
  }
}
