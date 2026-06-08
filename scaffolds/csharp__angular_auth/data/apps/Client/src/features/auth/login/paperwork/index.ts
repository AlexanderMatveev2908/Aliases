import { Reg } from '@/core/lib/paperwork/reg';
import { FormControl, FormGroup } from '@angular/forms';
import z from 'zod';

export class LoginFormMng {
  public static readonly schema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(Reg.PWD),
  });

  public static form(): FormGroup {
    return new FormGroup({
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }
}

export type LoginFormT = z.infer<typeof LoginFormMng.schema>;
