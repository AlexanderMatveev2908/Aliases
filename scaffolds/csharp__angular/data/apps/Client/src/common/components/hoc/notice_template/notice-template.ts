import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { PageWrapper } from '../page_wrapper/page-wrapper';
import { NoticeStateT } from '@/features/notice/reducer';
import { SvgT } from '@/common/types/general';
import { LibMetaEvent } from '@/core/lib/css/meta_event';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notice-template',
  imports: [PageWrapper, NgComponentOutlet, RouterLink],
  templateUrl: './notice-template.html',
  styleUrl: './notice-template.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeTemplate {
  public readonly noticeData: InputSignal<NoticeStateT> = input.required();

  public readonly Svg: Signal<SvgT> = computed(() => LibMetaEvent.svgByT(this.noticeData().eventT));
  public readonly mainClr: Signal<string> = computed(() =>
    LibMetaEvent.cssVarByT(this.noticeData().eventT),
  );
}
