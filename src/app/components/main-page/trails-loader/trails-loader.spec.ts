import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailsLoader } from './trails-loader';

describe('RoutesList', () => {
  let component: TrailsLoader;
  let fixture: ComponentFixture<TrailsLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailsLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailsLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
