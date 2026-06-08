import { Nullable } from '@/common/types/general';
import { Directive, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { FormControl, FormControlStatus } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UseInjCtxHk } from '../hooks/use_inj_ctx';

@Directive()
export class UseFormFieldDir extends UseInjCtxHk {
  public readonly ctrl: InputSignal<FormControl> = input.required();

  public val: Nullable<Signal<Nullable<string>>> = null;
  public touched: Nullable<Signal<boolean>> = null;

  public readonly errMsg: WritableSignal<Nullable<string>> = signal(null);

  protected readonly setupField = (): void => {
    this.usePlatform.inGlobalCtx(() => {
      const c: FormControl = this.ctrl();

      this.val = toSignal(c.valueChanges, {
        initialValue: c.value,
      });

      this.touched = toSignal(
        c.statusChanges.pipe(map((_: FormControlStatus) => c.touched || c.dirty)),
        {
          initialValue: c.touched || c.dirty,
        },
      );
    });

    this.useEffect(() => {
      void this.val?.();
      void this.touched?.();

      this.errMsg.set(this.ctrl().errors?.['zod']);
    });
  };
}
