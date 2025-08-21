import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ymap } from './ymap';

describe('Ymap', () => {
  let component: Ymap;
  let fixture: ComponentFixture<Ymap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ymap],
    }).compileComponents();

    fixture = TestBed.createComponent(Ymap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
