import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TitlePage } from '@/common/components/general/title_page/title-page';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginFormMng } from '@/features/auth/login/paperwork';
import { LoginUiFct } from '@/features/auth/login/ui_fct';
import { UseFormAppDir } from '@/core/directives/use_form_app';
import { PwdInput } from '@/common/components/forms/pwd_input/pwd-input';
import { TxtInput } from '@/common/components/forms/txt_input/txt-input';
import { UseApiTrackerHk } from '@/core/hooks/use_api_tracker';
import { UseAuthApiSvc } from '@/features/auth/api';
import { LibRootForm } from '@/core/lib/forms/root_form';
import { LibLog } from '@/core/lib/log';

@Component({
  selector: 'app-login-page',
  imports: [TitlePage, ReactiveFormsModule, PwdInput, TxtInput],
  providers: [UseApiTrackerHk],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage extends UseFormAppDir implements OnInit {
  public readonly form: FormGroup = LoginFormMng.form();
  public readonly LoginUiFct = LoginUiFct;
  public readonly schema = LoginFormMng.schema;

  public readonly apiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  public readonly authApi: UseAuthApiSvc = inject(UseAuthApiSvc);

  public handleSubmit(): void {
    LibRootForm.handleSubmit({
      form: this.form,
      schema: this.schema,
      onValid: (data) => this.apiTracker.track(this.authApi.login(data)).subscribe(),
      onInvalid: (errs) => LibLog.main('errors', errs),
    });
  }

  ngOnInit(): void {
    this.setupForm();
  }
}
