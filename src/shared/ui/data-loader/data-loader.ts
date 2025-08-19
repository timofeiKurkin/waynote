import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBlockStatusComponent } from '@taiga-ui/layout';
import { TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';

@Component({
  selector: 'app-data-loader',
  imports: [CommonModule, TuiBlockStatusComponent, TuiLoader],
  templateUrl: './data-loader.html',
  styleUrl: './data-loader.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiLoaderOptionsProvider({ size: 'xl' })],
})
export class DataLoader {
  isLoading = input.required<boolean>();
  isError = input.required<boolean>();
}
