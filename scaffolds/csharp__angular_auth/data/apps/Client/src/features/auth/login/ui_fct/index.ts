import { FormFieldT } from '@/common/types/dom';

export class LoginUiFct {
  public static readonly email: FormFieldT = {
    name: 'email',
    label: 'Email',
    type: 'email',
  };

  public static readonly password: FormFieldT = {
    name: 'password',
    label: 'Password',
    type: 'password',
  };
}
