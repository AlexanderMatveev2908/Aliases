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
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgFillEyeClose } from '../../svgs/fill/eye_close/eye-close';
import { SvgFillEyeOpen } from '../../svgs/fill/eye_open/eye-open';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-pwd-input',
  imports: [ReactiveFormsModule, NgComponentOutlet],
  templateUrl: './pwd-input.html',
  styleUrl: './pwd-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdInput extends UseFormFieldDir implements OnInit {
  public readonly field: InputSignal<FormFieldT> = input.required();

  public readonly isPwdVisible: WritableSignal<boolean> = signal(false);

  public readonly SvgField: Signal<SvgT> = computed(() =>
    this.isPwdVisible() ? SvgFillEyeClose : SvgFillEyeOpen,
  );

  ngOnInit(): void {
    this.setupField();
  }
}
