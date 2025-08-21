import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTrailForm } from './create-trail-form';

describe('CreateTrailForm', () => {
  let component: CreateTrailForm;
  let fixture: ComponentFixture<CreateTrailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrailForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTrailForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
