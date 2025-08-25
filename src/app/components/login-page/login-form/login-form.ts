import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButton,
  TuiError,
  TuiIcon,
  TuiLabel,
  TuiLink,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTextfieldOptionsDirective,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { LoginFormControls } from './login-form-interface';
import { passwordValidationRegx } from '../../../shared/components/form/validationPatterns';
import { AuthGoogle } from '../../../core/auth/auth-google/auth-google';
import { formValidationErrorsMap } from '../../../shared/components/form/formValidationErrorsMap';
import { Router, RouterLink } from '@angular/router';
import { AuthFormWrapper } from '../../../shared/components/form/auth-form-wrapper/auth-form-wrapper';
import { LoginService } from '../login-service/login-service';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [
    CommonModule,
    TuiButton,
    TuiForm,
    TuiHeader,
    TuiTitle,
    TuiTextfieldComponent,
    ReactiveFormsModule,
    TuiLabel,
    TuiError,
    TuiTextfieldDirective,
    TuiFieldErrorPipe,
    TuiIcon,
    TuiPassword,
    TuiTextfieldOptionsDirective,
    AuthGoogle,
    TuiLink,
    RouterLink,
    AuthFormWrapper,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [formValidationErrorsMap],
})
export class LoginForm {
  loginForm = new FormGroup<LoginFormControls>({
    email: new FormControl(null, {
      validators: [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    }),
    password: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(6), Validators.pattern(passwordValidationRegx)],
    }),
  });
  isWrongCredentials = signal(false);
  protected error = new TuiValidationError('Неправильный логин или пароль');

  constructor(private loginService: LoginService, private router: Router) {}

  protected get computedError(): TuiValidationError | null {
    return this.isWrongCredentials() ? this.error : null;
  }

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.loginService
        .login(email, password)
        .then(() => {
          this.router.navigate(['/']).then();
        })
        .catch(() => {
          this.isWrongCredentials.set(true);
        });
    }
  }
}
