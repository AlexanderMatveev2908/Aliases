import { FormFieldT } from '@/common/types/dom';

export class RegisterUiFct {
  public static readonly firstName: FormFieldT = {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
  };

  public static readonly lastName: FormFieldT = {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
  };

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

  public static readonly isTrainer: FormFieldT = {
    name: 'isTrainer',
    label: 'Register as Trainer',
    type: 'radio',
  };
}
