import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BgBlack } from '../bg_black/bg-black';
import { SidebarSlice } from '@/features/sidebar/slice';
import { LinksNonLoggedUiFct } from './etc/ui_fct';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthSlice } from '@/features/auth/slice';
import { UseAuthApiSvc } from '@/features/auth/api';
import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { finalize, tap } from 'rxjs';
import { UserSlice } from '@/features/user/slice';

@Component({
  selector: 'app-sidebar',
  imports: [BgBlack, RouterLink, NgClass],
  providers: [UseApiTrackerHk],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  public readonly authSlice: AuthSlice = inject(AuthSlice);
  public readonly apiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  public readonly userSlice: UserSlice = inject(UserSlice);

  private readonly authApi: UseAuthApiSvc = inject(UseAuthApiSvc);

  public readonly sidebarSlice: SidebarSlice = inject(SidebarSlice);
  public readonly linksNonLoggedUiFct = LinksNonLoggedUiFct;

  public handleSubmit(): void {
    this.apiTracker
      .track(
        this.authApi.logout().pipe(
          finalize(() => {
            this.sidebarSlice.toggleSidebar();
          }),
        ),
      )
      .subscribe();
  }
}
