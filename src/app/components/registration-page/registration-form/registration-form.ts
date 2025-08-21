import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { TuiCheckbox, TuiFieldErrorPipe, TuiPassword } from '@taiga-ui/kit';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { passwordValidationRegx } from '../../../shared/components/form/validationPatterns';
import { AuthGoogle } from '../../../auth/auth-google/auth-google';
import { formValidationErrorsMap } from '../../../shared/components/form/formValidationErrorsMap';
import { Router, RouterLink } from '@angular/router';
import { RegistrationFormControls } from './registration-form-interface';
import { AuthStateService } from '../../../auth/auth-state/auth-state-service';
import { RegistrationService } from '../registration-service/registration-service';
import { AuthFormWrapper } from '../../../shared/components/form/auth-form-wrapper/auth-form-wrapper';

@Component({
  standalone: true,
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
    TuiPassword,
    TuiIcon,
    TuiTextfieldOptionsDirective,
    AuthGoogle,
    RouterLink,
    TuiLink,
    AuthFormWrapper,
  ],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [formValidationErrorsMap],
})
export class RegistrationForm {
  registrationForm = new FormGroup<RegistrationFormControls>({
    name: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    }),
    email: new FormControl(null, {
      validators: [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    }),
    password: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(6), Validators.pattern(passwordValidationRegx)],
    }),
    policy: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private authStateService: AuthStateService
  ) {}

  registration() {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const { name, email, policy, password } = this.registrationForm.value;

    if (name && email && password && policy) {
      this.registrationService.registration(name, email, password).then(user => {
        this.authStateService.setUser({
          ...user.user,
          displayName: name,
        });
        this.authStateService.setIsAuth(true);
        this.router.navigate(['/']).then();
      });
    }
  }
}
