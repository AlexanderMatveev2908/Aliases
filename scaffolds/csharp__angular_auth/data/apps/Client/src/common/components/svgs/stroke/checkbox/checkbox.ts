
import { Nullable } from '@/common/types/general';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-stroke-checkbox',
  templateUrl: `./checkbox.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgStrokeCheckbox {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
    fill: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
    stroke: InputSignal<string> = input<string>('currentColor');
    
}
