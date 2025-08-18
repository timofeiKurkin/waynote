import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-page',
  imports: [CommonModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {}
