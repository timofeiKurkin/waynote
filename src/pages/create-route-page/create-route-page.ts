import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRouteForm } from '../../widgets/create-route-form/create-route-form';

@Component({
  selector: 'app-create-route-page',
  imports: [CommonModule, ReactiveFormsModule, CreateRouteForm],
  templateUrl: './create-route-page.html',
  styleUrl: './create-route-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateRoutePage {}
