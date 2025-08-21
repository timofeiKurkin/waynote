import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFormWrapper } from './auth-form-wrapper';

describe('AuthFormWrapper', () => {
  let component: AuthFormWrapper;
  let fixture: ComponentFixture<AuthFormWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
