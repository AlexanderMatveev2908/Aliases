import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { NoticeTemplate } from '@/common/components/hoc/notice_template/notice-template';
import { NoticeSlice } from '@/features/notice/slice';
import { NoticeStateT } from '@/features/notice/reducer';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { Nullable } from '@/common/types/general';
import { UseStorageSvc } from '@/core/services/use_storage';
import { UseNavSvc } from '@/core/services/use_nav';

@Component({
  selector: 'app-notice-page',
  imports: [NoticeTemplate],
  templateUrl: './notice-page.html',
  styleUrl: './notice-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticePage extends UseInjCtxHk {
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

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
