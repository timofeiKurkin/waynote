import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrailsLoader } from './trails-loader/trails-loader';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, ReactiveFormsModule, TrailsLoader],
  templateUrl: './main-page.html',
  styleUrl: './main-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
