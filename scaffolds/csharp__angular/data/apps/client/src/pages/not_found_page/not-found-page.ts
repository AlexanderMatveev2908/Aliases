import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoticeCsr } from '@/common/components/hoc/notice_csr/notice-csr';
import { NoticeStateT } from '@/features/notice/reducer';

@Component({
  selector: 'app-not-found-page',
  imports: [NoticeCsr],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  public readonly noticeProps: NoticeStateT = {
    cb: null,
    tmpt: 'HOME',
    eventT: 'INFO',
    msg: `🪙 The treasure chest is empty. Someone got here before you! 🪙`,
    status: 404,
  };
}
