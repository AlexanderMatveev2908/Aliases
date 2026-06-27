import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-title-page',
  imports: [],
  templateUrl: './title-page.html',
  styleUrl: './title-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitlePage {
  public readonly title: InputSignal<string> = input.required();
}
