import { Reg } from '@/core/lib/paperwork/reg';
import { FormControl, FormGroup } from '@angular/forms';
import z from 'zod';

export class RegisterFormMng {
  public static readonly schema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.email(),
    password: z.string().min(8).regex(Reg.PWD),
    isTrainer: z.boolean(),
  });

  public static form(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
      isTrainer: new FormControl(false, { nonNullable: true }),
    });
  }
}

export type RegisterFormT = z.infer<typeof RegisterFormMng.schema>;
