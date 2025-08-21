import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTrailForm } from './create-trail-form/create-trail-form';

@Component({
  selector: 'app-trail-route-page',
  imports: [CommonModule, ReactiveFormsModule, CreateTrailForm],
  templateUrl: './create-trail-page.html',
  styleUrl: './create-trail-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTrailPage {}
