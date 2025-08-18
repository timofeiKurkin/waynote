import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../../features/auth/ui/login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}
