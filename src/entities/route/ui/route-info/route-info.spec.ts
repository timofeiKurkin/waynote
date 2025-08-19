import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteInfo } from './route-info';

describe('RouteInfo', () => {
  let component: RouteInfo;
  let fixture: ComponentFixture<RouteInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
