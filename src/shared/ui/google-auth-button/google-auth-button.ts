import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-auth-button',
  imports: [CommonModule],
  templateUrl: './google-auth-button.html',
  styleUrl: './google-auth-button.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleAuthButton {
  clickHandler = output();
}
