import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoticeTemplate } from '@/common/components/hoc/notice_template/notice-template';
import { NoticeStateT } from '@/features/notice/reducer';

@Component({
  selector: 'app-not-found-page',
  imports: [NoticeTemplate],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  public readonly noticeData: NoticeStateT = {
    cb: null,
    tmpt: 'HOME',
    eventT: 'NONE',
    msg: '🪙 The treasure chest is empty. Someone got here before you! 🪙',
    status: 404,
  };
}
