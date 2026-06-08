import { UseNavSvc } from '@/core/services/use_nav';
import { AuthSlice } from '@/features/auth/slice';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayout implements OnInit {
  public readonly useNav: UseNavSvc = inject(UseNavSvc);
  public readonly authSlice: AuthSlice = inject(AuthSlice);

  ngOnInit(): void {
    this.useNav.ifPathStartsWith('/auth', () => {
      if (this.authSlice.isLogged()) this.useNav.replace('/', { from: null });
    });
  }
}
