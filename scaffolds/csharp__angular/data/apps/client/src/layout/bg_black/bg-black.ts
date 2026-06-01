import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-bg-black',
  imports: [NgClass],
  templateUrl: './bg-black.html',
  styleUrl: './bg-black.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgBlack {
  public readonly isBlack: InputSignal<boolean> = input.required();

  public readonly css: Signal<string> = computed(() => (this.isBlack() ? 'fixed' : 'hidden'));
}
