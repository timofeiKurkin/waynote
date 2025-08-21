import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailCard } from './trail-card';

describe('TrailCard', () => {
  let component: TrailCard;
  let fixture: ComponentFixture<TrailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
