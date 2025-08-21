import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTrails } from './user-trails/user-trails';

@Component({
  standalone: true,
  selector: 'app-my-trails-page',
  imports: [CommonModule, UserTrails],
  templateUrl: './my-trails-page.html',
  styleUrl: './my-trails-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTrailsPage {}
