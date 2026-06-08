

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-ng-logo',
  templateUrl: `./ng-logo.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvNgLogo {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}
