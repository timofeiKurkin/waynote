import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { TuiBlockStatusComponent } from '@taiga-ui/layout';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [CommonModule, TuiButton, TuiBlockStatusComponent, RouterLink],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
