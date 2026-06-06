import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '../store';
import { UseStorageSvc } from './use_storage';

@Injectable({
  providedIn: 'root',
})
export class UseKitSliceSvc {
  protected readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);
  protected readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
}
