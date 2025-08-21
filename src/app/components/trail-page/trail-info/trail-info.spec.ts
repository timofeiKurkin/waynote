import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailInfo } from './trail-info';

describe('RouteInfo', () => {
  let component: TrailInfo;
  let fixture: ComponentFixture<TrailInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
