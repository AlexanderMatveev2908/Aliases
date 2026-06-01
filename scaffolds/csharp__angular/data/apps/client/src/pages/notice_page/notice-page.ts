import { Nullable, SvgT } from '@/common/types/general';
import { LibMetaEvent } from '@/core/lib/meta_event';
import { UseNavSvc } from '@/core/services/use_nav';
import { UseStorageSvc } from '@/core/services/use_storage';
import { NoticeStateT } from '@/features/notice/reducer';
import { NoticeSlice } from '@/features/notice/slice';
import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { NoticeCsr } from '@/common/components/hoc/notice_csr/notice-csr';

@Component({
  selector: 'app-notice-page',
  imports: [NoticeCsr],
  templateUrl: './notice-page.html',
  styleUrl: './notice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticePage implements OnInit {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly noticeState: Signal<NoticeStateT> = computed(() =>
    this.noticeSlice.noticeState(),
  );

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      const stored: Nullable<Omit<NoticeStateT, 'cb'>> = this.useStorage.getItem('notice');
      if (stored)
        this.noticeSlice.setNotice({
          ...stored,
          cb: null,
        });
    });

    this.useNav.pushOutIfNotFrom('/notice');
  }
}
