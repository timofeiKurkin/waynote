import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { TuiCheckbox, TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { RegistrationFormControls } from '../../model/loginForm';
import { passwordValidationRegx } from '../../../../shared/const/validations';
import { UserService } from '../../../../entities/user/api/user-service';
import { AuthFormWrapper } from '../../../../shared/ui/auth-form-wrapper/auth-form-wrapper';
import { AuthGoogle } from '../auth-google/auth-google';
import { formValidationErrors } from '../../../../shared/libs/formValidationErrors';
import { Router } from '@angular/router';
import { AuthService } from '../../../../entities/user/state/auth-service';

@Component({
  selector: 'app-registration-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButton,
    TuiCheckbox,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiLabel,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiTitle,
    AuthFormWrapper,
    TuiPassword,
    TuiIcon,
    TuiTextfieldOptionsDirective,
    AuthGoogle,
  ],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [formValidationErrors],
})
export class RegistrationForm {
  registrationForm = new FormGroup<RegistrationFormControls>({
    name: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
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
    policy: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  registration() {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const { name, email, policy, password } = this.registrationForm.value;

    if (name && email && password && policy) {
      this.userService.register(name, email, password).then(user => {
        this.authService.setUser({
          ...user.user,
          displayName: name,
        });
        this.authService.setIsAuth(true);
        this.router.navigate(['/']).then();
      });
    }
  }
}
