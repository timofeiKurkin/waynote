import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-routes-page',
  imports: [CommonModule],
  templateUrl: './my-routes-page.html',
  styleUrl: './my-routes-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRoutesPage {}
