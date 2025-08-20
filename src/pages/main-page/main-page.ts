import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteListLoader } from '../../features/route-list-loader/route-list-loader';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, ReactiveFormsModule, RouteListLoader],
  templateUrl: './main-page.html',
  styleUrl: './main-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
