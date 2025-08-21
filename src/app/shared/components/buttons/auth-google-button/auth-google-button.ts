import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-google-button',
  imports: [CommonModule],
  templateUrl: './auth-google-button.html',
  styleUrl: './auth-google-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthGoogleButton {
  clickHandler = output();
}
