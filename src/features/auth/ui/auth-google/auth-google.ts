import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthButton } from '../../../../shared/ui/google-auth-button/google-auth-button';
import { GoogleAuthService } from '../../../../entities/user/libs/google-auth-service/google-auth-service';

@Component({
  selector: 'app-auth-google',
  imports: [CommonModule, GoogleAuthButton],
  templateUrl: './auth-google.html',
  styleUrl: './auth-google.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthGoogle {
  constructor(private googleAuthService: GoogleAuthService) {}

  googleAuth() {
    // When use "signInWithPopup" you will receive these errors. It's better to use "signInWithRedirect" but it doesn't work on localhost
    // Unchecked runtime.lastError: The message port closed before a response was received.
    // Cross-Origin-Opener-Policy policy would block the window.closed call
    this.googleAuthService.googleAuth().then();
  }
}
