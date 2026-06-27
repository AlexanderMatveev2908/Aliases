import { AppEventT } from '@/common/types/general';
import { LibMetaEvent } from '@/core/lib/css/meta_event';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { v4 } from 'uuid';

@Component({
  selector: 'app-spin-page-ssr',
  imports: [],
  templateUrl: './spin-page-ssr.html',
  styleUrl: './spin-page-ssr.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinPageSsr {
  public readonly eventT: InputSignal<AppEventT> = input.required();

  public readonly IDs: string[] = Array.from({ length: 10 }, () => v4());

  private readonly dotsCount: number = this.IDs.length;

  public readonly mainColor: Signal<string> = computed(() => LibMetaEvent.cssVarByT(this.eventT()));

  // ? derived
  public getRotation(idx: number): string {
    return `${(360 / this.dotsCount) * idx}deg`;
  }

  public getDelay(idx: number): string {
    return `${(1 / this.dotsCount) * idx}s`;
  }
}
