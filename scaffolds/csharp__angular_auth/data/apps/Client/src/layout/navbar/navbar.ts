import { SvgAdvNgLogo } from '@/common/components/svgs/advanced/ng_logo/ng-logo';
import { SvgFillBurger } from '@/common/components/svgs/fill/burger/burger';
import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { SvgT } from '@/common/types/general';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { SidebarSlice } from '@/features/sidebar/slice';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgComponentOutlet, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  public readonly sidebarSlice: SidebarSlice = inject(SidebarSlice);

  public readonly SvgNg: SvgT = SvgAdvNgLogo;

  public readonly SvgBurger: Signal<SvgT> = computed(() =>
    this.sidebarSlice.sidebarState().isOpen ? SvgFillClose : SvgFillBurger,
  );
}
