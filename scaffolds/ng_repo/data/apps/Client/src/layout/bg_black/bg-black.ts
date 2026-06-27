import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-bg-black',
  imports: [],
  templateUrl: './bg-black.html',
  styleUrl: './bg-black.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgBlack {
  public readonly isBlack: InputSignal<boolean> = input.required();
  public readonly zIndex: InputSignal<number> = input.required();
}
