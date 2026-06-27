import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { UseFormFieldDir } from './use_form_field_dir';
import { FormFieldT } from '@/common/types/dom';
import { Nullable } from '@/common/types/general';

@Directive()
export abstract class UseFormFieldImg extends UseFormFieldDir {
  public readonly field: InputSignal<FormFieldT> = input.required();

  private isFile(val: unknown): val is File {
    return val instanceof File;
  }

  public readonly srcImg: Signal<Nullable<string>> = computed(() => {
    const val = this.val?.();

    if (typeof val === 'string') {
      return val;
    }

    if (this.isFile(val)) {
      return URL.createObjectURL(val);
    }

    return null;
  });

  public handleFileChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) return;

    const c = this.ctrl();
    c.markAsDirty();
    c.markAsTouched();
    c.setValue(file);
  }
}
