import { FormFieldT } from '@/common/types/dom';
import { UseFormFieldDir } from '@/core/directives/use_form_field_dir';
import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-txt-input',
  imports: [ReactiveFormsModule],
  templateUrl: './txt-input.html',
  styleUrl: './txt-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtInput extends UseFormFieldDir implements OnInit {
  public readonly field: InputSignal<FormFieldT> = input.required();

  ngOnInit(): void {
    this.setupField();
  }
}
