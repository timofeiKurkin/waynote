import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteInfo } from '../../entities/route/ui/route-info/route-info';

@Component({
  selector: 'app-route-page',
  imports: [CommonModule, RouteInfo],
  templateUrl: './route-page.html',
  styleUrl: './route-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePage {}
