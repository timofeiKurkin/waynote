import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutesLoader } from '../../features/user-routes-loader/user-routes-loader';

@Component({
  selector: 'app-my-routes-page',
  imports: [CommonModule, UserRoutesLoader],
  templateUrl: './my-routes-page.html',
  styleUrl: './my-routes-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRoutesPage {}
