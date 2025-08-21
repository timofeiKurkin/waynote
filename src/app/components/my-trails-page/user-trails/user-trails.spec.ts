import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTrails } from './user-trails';

describe('UserTrails', () => {
  let component: UserTrails;
  let fixture: ComponentFixture<UserTrails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTrails],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTrails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
