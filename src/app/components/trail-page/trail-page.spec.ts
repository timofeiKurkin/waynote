import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailPage } from './trail-page';

describe('RoutePage', () => {
  let component: TrailPage;
  let fixture: ComponentFixture<TrailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
