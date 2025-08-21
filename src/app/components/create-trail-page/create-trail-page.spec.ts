import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTrailPage } from './create-trail-page';

describe('CreateTrailPage', () => {
  let component: CreateTrailPage;
  let fixture: ComponentFixture<CreateTrailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTrailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
