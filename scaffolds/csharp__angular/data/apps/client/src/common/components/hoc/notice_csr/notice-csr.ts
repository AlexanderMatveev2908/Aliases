import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { PageWrapper } from '../page_wrapper/page-wrapper';
import { RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { LibMetaEvent } from '@/core/lib/meta_event';
import { SvgT } from '@/common/types/general';
import { NoticeStateT } from '@/features/notice/reducer';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { NoticeCsrAnimations } from './animations';

@Component({
  selector: 'app-notice-csr',
  imports: [PageWrapper, RouterLink, NgComponentOutlet],
  templateUrl: './notice-csr.html',
  styleUrl: './notice-csr.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeCsr implements AfterViewInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly props: InputSignal<NoticeStateT> = input.required();

  public readonly Svg: Signal<SvgT> = computed(() => LibMetaEvent.svgByT(this.props().eventT));
  public readonly mainColor: Signal<string> = computed(() =>
    LibMetaEvent.cssVarByT(this.props().eventT),
  );

  private run: boolean = false;

  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    if (this.run) return;
    this.run = true;

    this.usePlatform.withDOM(() => {
      requestAnimationFrame(() => {
        NoticeCsrAnimations.main({
          svgDOM: document.getElementById('svg__content'),
          contentDOM: document.getElementById('root__content'),
          spanStatusDOM: document.getElementById('status__span'),
          spanMsgDOM: document.getElementById('msg__span'),
        });
      });
    });
  }
}
