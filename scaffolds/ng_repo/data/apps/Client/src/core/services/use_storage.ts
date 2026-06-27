import { inject, Injectable } from '@angular/core';
import { UsePlatformSvc } from './use_platform';
import { BoolStrT, Nullable } from '@/common/types/general';
import { StorageKeyT } from '@/common/types/storage';
import { ErrApp } from '../lib/errApp';
import { LibShape } from '../lib/data_structure/shape';
import { LibLog } from '../lib/log';
import { LibParser } from '../lib/data_structure/parser';

@Injectable({
  providedIn: 'root',
})
export class UseStorageSvc {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  private checkEnv<T>(cb: () => T): Nullable<T> {
    if (this.usePlatform.isServer) return null;

    return cb();
  }

  public cleanAll(): Nullable<void> {
    return this.checkEnv(() => {
      sessionStorage.clear();
    });
  }

  public setItem<T>(key: StorageKeyT, data: T): Nullable<void> {
    return this.checkEnv(() => {
      if (LibShape.isNone(data)) throw new ErrApp('passed None to "setStorage"');
      else if (LibShape.isPrimitive(data)) sessionStorage.setItem(key, data + '');
      else sessionStorage.setItem(key, JSON.stringify(data));
    });
  }

  public getItem<T>(key: StorageKeyT): Nullable<T> {
    return this.checkEnv(() => {
      const data: unknown = sessionStorage.getItem(key);

      if (LibShape.isNone(data) || LibShape.isNoneBug(data)) {
        return null;
      } else {
        const str: string = data as string;

        try {
          if (LibShape.isJsonObj(str)) return JSON.parse(str) as T;
        } catch {
          LibLog.main('isJsonObj failed check');
          return str as T;
        }

        return (LibShape.isBoolStr(str) ? LibParser.strToBool(str as BoolStrT) : str) as T;
      }
    });
  }

  public removeItem(key: StorageKeyT): Nullable<void> {
    return this.checkEnv(() => {
      sessionStorage.removeItem(key);
    });
  }
}
