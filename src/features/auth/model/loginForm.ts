import { FormControl } from '@angular/forms';

export interface LoginFormControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface RegistrationFormControls extends LoginFormControls {
  name: FormControl<string | null>;
  policy: FormControl<boolean>;
}
