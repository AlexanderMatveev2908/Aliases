import { inject, Injectable } from '@angular/core';
import { UseStorageSvc } from './use_storage';
import { UseNavSvc } from './use_nav';
import { UseApiSvc } from '../api';

@Injectable({
  providedIn: 'root',
})
export class UseKitApiSvc {
  public readonly api: UseApiSvc = inject(UseApiSvc);
  protected readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);
}
