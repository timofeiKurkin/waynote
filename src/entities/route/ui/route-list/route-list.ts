import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DataLoader } from '../../../../shared/ui/data-loader/data-loader';
import { TuiBlockStatusComponent } from '@taiga-ui/layout';
import { Ymap } from '../../../../widgets/ymap/ui/ymap';
import { RoutePreview } from '../../models/interface';
import { RouterLink } from '@angular/router';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-route-list',
  imports: [
    CommonModule,
    DataLoader,
    NgOptimizedImage,
    TuiBlockStatusComponent,
    Ymap,
    RouterLink,
    TuiAppearance,
    TuiButton,
  ],
  templateUrl: './route-list.html',
  styleUrl: './route-list.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteList {
  isError = input.required<boolean>();
  routes = input.required<RoutePreview[] | null>();
}
