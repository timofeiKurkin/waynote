import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-form-wrapper',
  imports: [CommonModule],
  templateUrl: './auth-form-wrapper.html',
  styleUrl: './auth-form-wrapper.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormWrapper {}
