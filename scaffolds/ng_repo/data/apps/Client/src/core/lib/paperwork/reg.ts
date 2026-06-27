import { OrNone } from '@/common/types/general';
import { LibShape } from '../data_structure/shape';

export class Reg {
  public static readonly INT: RegExp = /^\d+$/;

  public static readonly PWD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

  public static check(arg: OrNone<string>, reg: RegExp): boolean {
    return LibShape.hasText(arg) && reg.test(arg as string);
  }

  public static isInt(arg: OrNone<string>): boolean {
    return this.check(arg, this.INT);
  }
}
