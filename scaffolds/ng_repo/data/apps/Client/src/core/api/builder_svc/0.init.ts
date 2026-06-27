import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseConfApiSvc } from '@/core/services/use_conf_api';
import { inject, Injectable } from '@angular/core';

@Injectable()
export abstract class UseSideEffectsMngInitHk extends UseInjCtxHk {
  protected readonly confApi: UseConfApiSvc = inject(UseConfApiSvc);
  protected readonly DEF_CLIENT_ERR_MSG: string =
    'A wild Snorlax fall asleep blocking the road 💤. Try later';
}
