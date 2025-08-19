import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLoader } from './data-loader';

describe('DataLoader', () => {
  let component: DataLoader;
  let fixture: ComponentFixture<DataLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
