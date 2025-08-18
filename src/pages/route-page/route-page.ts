import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-page',
  imports: [CommonModule],
  templateUrl: './route-page.html',
  styleUrl: './route-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePage {}
