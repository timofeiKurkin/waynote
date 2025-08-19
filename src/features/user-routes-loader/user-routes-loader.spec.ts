import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRoutesLoader } from './user-routes-loader';

describe('UserRoutesLoader', () => {
  let component: UserRoutesLoader;
  let fixture: ComponentFixture<UserRoutesLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoutesLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRoutesLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
