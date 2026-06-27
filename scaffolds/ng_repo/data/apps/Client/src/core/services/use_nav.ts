import { Nullable } from '@/common/types/general';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Navigation,
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { UseInjCtxHk } from '../hooks/use_inj_ctx';
import { filter } from 'rxjs';
import { NoticeSlice } from '@/features/notice/slice';
import { NoticeStateT } from '@/features/notice/reducer';
import { MetaNavT, NavFromT, NavOptT } from '@/common/types/nav';
import { LibShape } from '../lib/data_structure/shape';

@Injectable({
  providedIn: 'root',
})
export class UseNavSvc extends UseInjCtxHk {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly router: Router = inject(Router);

  private readonly ALLOWED_FROM: Set<NavFromT> = new Set<NavFromT>(['ERR', 'OK']);

  public readonly currPath: WritableSignal<Nullable<string>> = signal(null);
  public readonly goingTo: WritableSignal<Nullable<string>> = signal(null);
  public readonly meta: WritableSignal<Nullable<MetaNavT>> = signal(null);
  public readonly query: WritableSignal<Nullable<Params>> = signal(null);
  public readonly pathVariables: WritableSignal<Nullable<Params>> = signal(null);

  private findDeepestRoute(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let snap: ActivatedRouteSnapshot = snapshot;
    while (snap.firstChild) snap = snap.firstChild;

    return snap;
  }

  constructor() {
    super();

    this.router.events
      .pipe(filter((e: unknown) => e instanceof NavigationStart || e instanceof NavigationEnd))
      .subscribe((e: NavigationStart | NavigationEnd) => {
        if (e instanceof NavigationStart) {
          this.goingTo.set(e.url);
          return;
        }

        this.currPath.set(e.urlAfterRedirects);

        const navigation: Nullable<Navigation> = this.router.currentNavigation();

        this.meta.set((navigation?.extras.state as MetaNavT) ?? null);

        const snapshot: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;

        const queryParams: Params = snapshot.root.queryParams;

        this.query.set(LibShape.hasObjData(queryParams) ? queryParams : null);

        const deepestSnap: ActivatedRouteSnapshot = this.findDeepestRoute(snapshot);
        const params: Params = deepestSnap.params;

        this.pathVariables.set(LibShape.hasObjData(params) ? params : null);
      });
  }

  private async nav(arg: string, { replace, from }: NavOptT): Promise<boolean> {
    if (this.usePlatform.isServer) {
      return Promise.resolve(false);
    }

    return await this.router.navigate([arg], {
      replaceUrl: replace,
      state: {
        from,
      },
    });
  }

  private isAllowedFrom(): boolean {
    const meta: Nullable<MetaNavT> = this.meta();

    if (!meta?.from || !this.ALLOWED_FROM.has(meta?.from)) return false;
    return true;
  }

  public pushOutIfNotFrom(path: string): void {
    this.useEffect(() => {
      this.ifPathEqual(path, () => {
        if (this.isAllowedFrom()) return;

        void this.replace('/', {
          from: null,
        });
      });
    });
  }

  public ifPathStartsWith(arg: string, cb: (path: string) => void): void {
    const path: Nullable<string> = this.currPath();
    if (!path || !path.startsWith(arg)) return;

    cb(path);
  }

  public ifPathEqual(arg: string, cb: (full: string) => void): void {
    const full: Nullable<string> = this.currPath();
    if (!full) return;

    const partial: string = full.split('?')[0];
    if (partial !== arg) return;

    cb(full);
  }

  public async replace(arg: string, { from }: { from: Nullable<NavFromT> }): Promise<boolean> {
    return this.nav(arg, { replace: true, from: from });
  }

  public async push(arg: string, { from }: { from: Nullable<NavFromT> }): Promise<boolean> {
    return this.nav(arg, { replace: false, from });
  }

  public pushNotice(arg: NoticeStateT): void {
    this.noticeSlice.setNotice(arg);
    void this.replace('/notice', { from: 'ERR' });
  }
}
