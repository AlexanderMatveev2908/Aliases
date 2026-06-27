import { FormGroup } from '@angular/forms';
import z, { ZodSafeParseResult } from 'zod';

export class LibRootForm {
  public static setupIssues<T>({
    data,
    schema,
    form,
  }: {
    data: T;
    schema: z.ZodType<T>;
    form: FormGroup;
  }): void {
    const res: ZodSafeParseResult<T> = schema.safeParse(data);

    for (const ctrl of Object.values(form.controls)) {
      ctrl.setErrors(null);
    }

    if (res.success) return;

    for (const issue of res.error.issues) {
      const ctrl = form.get(issue.path.join('.'));

      if (ctrl?.touched || ctrl?.dirty) {
        ctrl.setErrors({
          zod: issue.message,
        });
      }
    }
  }

  private static applyIssues<T>({
    data,
    schema,
    form,
  }: {
    data: T;
    schema: z.ZodType<T>;
    form: FormGroup;
  }): z.core.$ZodIssue[] {
    const res: ZodSafeParseResult<T> = schema.safeParse(data);

    for (const ctrl of Object.values(form.controls)) {
      ctrl.setErrors(null);
    }

    if (res.success) return [];

    form.markAllAsTouched();

    for (const issue of res.error.issues) {
      const ctrl = form.get(issue.path.join('.'));

      ctrl?.setErrors({
        zod: issue.message,
      });

      ctrl?.markAsDirty();
      ctrl?.markAsTouched();
    }

    return res.error.issues;
  }

  public static handleSubmit<T>({
    form,
    schema,
    onValid,
    onInvalid,
  }: {
    form: FormGroup;
    schema: z.ZodType<T>;
    onValid: (data: T) => void;
    onInvalid: (issues: z.core.$ZodIssue[]) => void;
  }): void {
    const data: T = form.getRawValue() as T;

    const issues: z.core.$ZodIssue[] = this.applyIssues({
      data,
      schema,
      form,
    });

    if (issues.length > 0) {
      onInvalid(issues);
      return;
    }

    onValid(data);
  }
}
