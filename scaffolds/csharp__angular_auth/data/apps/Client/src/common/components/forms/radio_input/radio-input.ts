import { FormFieldT } from '@/common/types/dom';
import { SvgT } from '@/common/types/general';
import { UseFormFieldDir } from '@/core/directives/use_form_field_dir';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgFillCheckboxChecked } from '../../svgs/fill/checkbox_checked/checkbox-checked';
import { SvgStrokeCheckbox } from '../../svgs/stroke/checkbox/checkbox';

@Component({
  selector: 'app-radio-input',
  imports: [NgComponentOutlet],
  templateUrl: './radio-input.html',
  styleUrl: './radio-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioInput extends UseFormFieldDir implements OnInit {
  public readonly field: InputSignal<FormFieldT> = input.required();

  public readonly SvgCheck: Signal<SvgT> = computed(() => {
    return this.val?.() ? SvgFillCheckboxChecked : SvgStrokeCheckbox;
  });

  public toggleState(): void {
    this.ctrl().markAsDirty();
    this.ctrl().markAsTouched();
    this.ctrl().setValue(!this.val?.());
  }

  ngOnInit(): void {
    this.setupField();
  }
}
