import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButton,
  TuiIcon,
  TuiLabel,
  TuiSelectLike,
  TuiTextfieldDropdownDirective,
  TuiTextfieldMultiComponent,
} from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  TuiChevron,
  TuiDataListWrapperComponent,
  TuiInputChipDirective,
  TuiMultiSelectGroupDirective,
} from '@taiga-ui/kit';

@Component({
  selector: 'app-main-page',
  imports: [
    CommonModule,
    TuiButton,
    TuiIcon,
    RouterLink,
    ReactiveFormsModule,
    TuiDataListWrapperComponent,
    TuiTextfieldMultiComponent,
    TuiChevron,
    TuiLabel,
    TuiInputChipDirective,
    TuiTextfieldDropdownDirective,
    TuiSelectLike,
    TuiMultiSelectGroupDirective,
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  cities: string[] = [];
  years: number[] = [];

  cityFiltering = new FormControl<string[]>([]);
  yearFiltering = new FormControl<string[]>([]);
}
