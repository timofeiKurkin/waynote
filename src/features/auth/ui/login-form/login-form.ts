import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButton,
  TuiError,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTextfieldOptionsDirective,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { LoginFormControls } from '../../model/loginForm';
import { UserService } from '../../../../entities/user/api/user-service';
import { passwordValidationRegx } from '../../../../shared/const/validations';
import { AuthFormWrapper } from '../../../../shared/ui/auth-form-wrapper/auth-form-wrapper';
import { AuthGoogle } from '../auth-google/auth-google';
import { formValidationErrors } from '../../../../shared/libs/formValidationErrors';
import { Router } from '@angular/router';

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
    TuiIcon,
    TuiPassword,
    AuthFormWrapper,
    TuiTextfieldOptionsDirective,
    AuthGoogle,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [formValidationErrors],
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

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.userService.login(email, password).then(() => {
        this.router.navigate(['/']).then();
      });
    }
  }
}
