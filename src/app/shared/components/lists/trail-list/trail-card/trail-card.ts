import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticMap } from '../../../maps/static-map/static-map';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { ITrailCard } from '../trail-card-interface';

@Component({
  selector: 'app-trail-card',
  imports: [CommonModule, StaticMap, TuiAppearance, TuiButton, RouterLink],
  templateUrl: './trail-card.html',
  styleUrl: './trail-card.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailCard {
  trail = input.required<ITrailCard>();
}
