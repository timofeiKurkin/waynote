import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRouteForm } from './create-route-form';

describe('CreateRouteForm', () => {
  let component: CreateRouteForm;
  let fixture: ComponentFixture<CreateRouteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRouteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRouteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
