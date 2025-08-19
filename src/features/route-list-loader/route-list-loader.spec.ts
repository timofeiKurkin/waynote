import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteListLoader } from './route-list-loader';

describe('RoutesList', () => {
  let component: RouteListLoader;
  let fixture: ComponentFixture<RouteListLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteListLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteListLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
