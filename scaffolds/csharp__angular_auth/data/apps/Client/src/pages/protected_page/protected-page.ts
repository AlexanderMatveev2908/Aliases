import { UseAuthApiSvc } from '@/features/auth/api';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected-page',
  imports: [],
  templateUrl: './protected-page.html',
  styleUrl: './protected-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProtectedPage implements OnInit {
  public readonly authApi: UseAuthApiSvc = inject(UseAuthApiSvc);

  ngOnInit(): void {
    this.authApi.getProtectedData().subscribe();
  }
}
