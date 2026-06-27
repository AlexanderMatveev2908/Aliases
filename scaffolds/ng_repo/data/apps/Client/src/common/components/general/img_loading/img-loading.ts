import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SvgFillError } from '../../svgs/fill/error/error';
import { SvgT } from '@/common/types/general';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-img-loading',
  imports: [NgComponentOutlet],
  templateUrl: './img-loading.html',
  styleUrl: './img-loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgLoading {
  public readonly isLoaded: WritableSignal<boolean> = signal(false);
  public readonly isError: WritableSignal<boolean> = signal(false);

  public readonly src: InputSignal<string> = input.required();

  public readonly SvgCross: SvgT = SvgFillError;

  public markLoaded(): void {
    this.isLoaded.set(true);
  }

  public markError(): void {
    console.log(this.src());
    this.isError.set(true);
    this.isLoaded.set(true);
  }
}
