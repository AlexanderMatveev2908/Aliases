import { UsePlatformSvc } from '@/core/services/use_platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  input,
  InputSignal,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { SpinPageSsr } from '../../spins/spin_page_ssr/spin-page-ssr';
import { RefTemplateT } from '@/common/types/dom';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-page-wrapper',
  imports: [SpinPageSsr, NgTemplateOutlet],
  templateUrl: './page-wrapper.html',
  styleUrl: './page-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapper implements AfterViewInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly waitClient: InputSignal<boolean> = input.required();
  public readonly isPending: InputSignal<boolean> = input(false);

  public readonly isHydrated: WritableSignal<boolean> = signal(false);

  @ContentChild('contentRef', { read: TemplateRef })
  public readonly contentRef: RefTemplateT;

  ngAfterViewInit(): void {
    this.usePlatform.withDOM(() => {
      this.isHydrated.set(true);
    });
  }
}
