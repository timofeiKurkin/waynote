import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationForm } from './registration-form/registration-form';

@Component({
  selector: 'app-registration-page',
  imports: [CommonModule, RegistrationForm],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage {}
