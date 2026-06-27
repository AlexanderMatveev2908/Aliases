import { RefDomT } from '@/common/types/dom';
import { TimerIdT } from '@/common/types/general';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibTimer } from '@/core/lib/timer';
import { ToastSlice } from '@/features/toast/slice';
import { computed, Directive, effect, EffectRef, inject, Signal, ViewChild } from '@angular/core';
import { UseToastAnimationsSvc } from './animations_svc';
import { ToastStateT } from '@/features/toast/reducer';

@Directive()
export class UseAnimationsDir extends UseInjCtxHk {
  private readonly useAnimationsSvc: UseToastAnimationsSvc = inject(UseToastAnimationsSvc);

  protected readonly toastSlice: ToastSlice = inject(ToastSlice);

  public readonly toastState: Signal<ToastStateT> = computed(() => this.toastSlice.toastState());

  @ViewChild('toast') toast: RefDomT;
  @ViewChild('timerToast') timerToast: RefDomT;

  private timerID: TimerIdT = null;
  private hasOpenedOnce = false;

  public timerEffect?: EffectRef;

  private clearTmr(): void {
    this.timerID = LibTimer.clear(this.timerID);
  }

  private handleToastClose(toastEl: HTMLElement, toastTimerEl: HTMLElement): void {
    this.clearTmr();
    this.useAnimationsSvc.toastOut(toastEl, toastTimerEl);
  }

  private programClose(): void {
    const IN_ANIMATION_LAST: number = 5000;

    this.timerID = setTimeout(() => {
      this.closeClick();
    }, IN_ANIMATION_LAST);
  }

  private handleToastOpen(toastEl: HTMLElement, toastTimerEl: HTMLElement): void {
    const OUT_ANIMATION_LAST: number = 300;

    if (!this.toastState().prevID) {
      this.useAnimationsSvc.toastIn(toastEl, toastTimerEl);
      this.programClose();
    } else {
      this.handleToastClose(toastEl, toastTimerEl);

      setTimeout(() => {
        this.useAnimationsSvc.toastIn(toastEl, toastTimerEl);
        this.programClose();
      }, OUT_ANIMATION_LAST);
    }
  }

  protected readonly handleAnimationDir = (): void => {
    this.usePlatform.inGlobalCtx(() => {
      this.timerEffect = effect(() => {
        const toastEl = this.toast?.nativeElement;
        const toastTimerEl = this.timerToast?.nativeElement;

        if (!this.usePlatform.isClient || !toastEl || !toastTimerEl) return;

        if (this.toastState().isToast && this.toastState().currID) {
          this.handleToastOpen(toastEl, toastTimerEl);
          this.hasOpenedOnce = true;
        } else if (!this.toastState().isToast && this.hasOpenedOnce) {
          this.handleToastClose(toastEl, toastTimerEl);
        }
      });
    });
  };

  public closeClick(): void {
    this.clearTmr();
    this.toastSlice.closeToast();
  }
}
