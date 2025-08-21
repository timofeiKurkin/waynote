import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailInfo } from './trail-info/trail-info';

@Component({
  selector: 'app-trail-page',
  imports: [CommonModule, TrailInfo],
  templateUrl: './trail-page.html',
  styleUrl: './trail-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailPage {}
