import { inject, Injectable } from '@angular/core';
import { UseInjCtxHk } from '../hooks/use_inj_ctx';
import { UseNavSvc } from './use_nav';

@Injectable({ providedIn: 'root' })
export class UseScrollSvc extends UseInjCtxHk {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public main(): void {
    this.useEffect(() => {
      void this.useNav.currPath();

      this.usePlatform.onClient(() => {
        setTimeout(() => {
          window.scroll({ top: 0, behavior: 'smooth' });
        }, 0);
      });
    });
  }
}
