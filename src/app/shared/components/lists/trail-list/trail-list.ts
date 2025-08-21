import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DataLoader } from '../../data-loader/data-loader';
import { TuiBlockStatusComponent } from '@taiga-ui/layout';
import { TrailCard } from './trail-card/trail-card';
import { ITrailCard } from './trail-card-interface';

@Component({
  selector: 'app-trail-list',
  imports: [CommonModule, DataLoader, NgOptimizedImage, TuiBlockStatusComponent, TrailCard],
  templateUrl: './trail-list.html',
  styleUrl: './trail-list.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailList {
  isError = input.required<boolean>();
  trails = input.required<ITrailCard[]>();
}
