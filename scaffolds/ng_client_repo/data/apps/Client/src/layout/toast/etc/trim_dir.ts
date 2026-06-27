import { ElDomT, RefDomT } from '@/common/types/dom';
import { TxtDom } from '@/core/lib/dom/txt';
import {
  Directive,
  effect,
  EffectRef,
  HostListener,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { UseAnimationsDir } from './animations_dir';

@Directive()
export class UseToastTrimDir extends UseAnimationsDir {
  @ViewChild('msgContainer') msgContainer: RefDomT;

  public readonly trimmedMsg: WritableSignal<string> = signal('');
  private trimEffect?: EffectRef;

  private setCutMsg(): void {
    const msg: string = this.toastState().msg;
    const MAX_LINES = 3;

    const elDOM: ElDomT = this.msgContainer?.nativeElement;
    if (!elDOM) return;

    this.trimmedMsg.set(TxtDom.binaryTrim(msg, { el: elDOM, maxLines: MAX_LINES }));
  }

  protected setTrimEffect(): void {
    this.usePlatform.inGlobalCtx(() => {
      this.trimEffect = effect(() => {
        void this.toastState();
        this.setCutMsg();
      });
    });
  }

  @HostListener('window:resize')
  onresize(): void {
    if (!this.usePlatform.isClient) return;

    this.setCutMsg();
  }
}
