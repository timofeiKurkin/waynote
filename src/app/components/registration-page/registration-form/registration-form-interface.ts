import { FormControl } from '@angular/forms';

export interface RegistrationFormControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string | null>;
  policy: FormControl<boolean>;
}
