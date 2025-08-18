import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButton,
  TuiError,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { LoginFormControls } from '../../model/loginForm';
import { UserService } from '../../../../entities/user/api/user-service';
import { passwordValidationRegx } from '../../../../shared/const/validations';
import { AuthService } from '../../../../entities/user/state/auth-service';
import { Router } from '@angular/router';
import { googleAuthHandler } from '../../libs/auth';

@Component({
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
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  loginForm = new FormGroup<LoginFormControls>({
    email: new FormControl(null, {
      validators: [
        Validators.email,
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ],
    }),
    password: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(passwordValidationRegx),
      ],
    }),
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsDirty();
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.userService.login(email, password).then();
    }
  }

  googleAuth() {
    googleAuthHandler.call(this);
  }
}
