import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticMap } from './static-map';

describe('StaticMap', () => {
  let component: StaticMap;
  let fixture: ComponentFixture<StaticMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticMap],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
