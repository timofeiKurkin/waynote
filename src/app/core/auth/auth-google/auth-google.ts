import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGoogleService } from './auth-google-service/auth-google-service';
import { AuthGoogleButton } from '../../../shared/components/buttons/auth-google-button/auth-google-button';

@Component({
  selector: 'app-auth-google',
  imports: [CommonModule, AuthGoogleButton],
  templateUrl: './auth-google.html',
  styleUrl: './auth-google.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthGoogle {
  constructor(private googleAuthService: AuthGoogleService) {}

  googleAuth() {
    // When use "signInWithPopup" you will receive these errors. It's better to use "signInWithRedirect" but it doesn't work on localhost
    // Unchecked runtime.lastError: The message port closed before a response was received.
    // Cross-Origin-Opener-Policy policy would block the window.closed call
    this.googleAuthService.googleAuth().then();
  }
}
