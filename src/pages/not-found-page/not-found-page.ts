import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found-page',
  imports: [CommonModule],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
