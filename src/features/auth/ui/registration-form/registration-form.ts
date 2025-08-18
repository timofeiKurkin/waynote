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
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiCheckbox, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { RegistrationFormControls } from '../../model/loginForm';
import { passwordValidationRegx } from '../../../../shared/const/validations';
import { UserService } from '../../../../entities/user/api/user-service';
import { AuthService } from '../../../../entities/user/state/auth-service';
import { Router } from '@angular/router';
import { googleAuthHandler } from '../../libs/auth';

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
  ],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationForm {
  registrationForm = new FormGroup<RegistrationFormControls>({
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
    policy: new FormControl(false, [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  registration() {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsDirty();
    }

    const { email, policy, password } = this.registrationForm.value;

    if (email && password && policy) {
      this.userService.register(email, password).then();
    }
  }

  googleAuth() {
    googleAuthHandler.call(this);
  }
}
