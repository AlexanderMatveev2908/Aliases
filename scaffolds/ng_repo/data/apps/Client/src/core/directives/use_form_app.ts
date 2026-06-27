import { Directive, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs';
import { UseInjCtxHk } from '../hooks/use_inj_ctx';
import { ZodType } from 'zod';
import { LibRootForm } from '../lib/forms/root_form';

@Directive()
export abstract class UseFormAppDir extends UseInjCtxHk {
  public abstract form: FormGroup;
  public abstract schema: ZodType;

  public data!: Signal<unknown>;

  public getCtrl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  protected setupForm(): void {
    this.usePlatform.inGlobalCtx(() => {
      this.data = toSignal(this.form.valueChanges.pipe(startWith(this.form.getRawValue())), {
        initialValue: this.form.getRawValue(),
      });
    });

    this.useEffect(() => {
      LibRootForm.setupIssues({
        form: this.form,
        schema: this.schema,
        data: this.data(),
      });
    });
  }
}
