import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthGoogleButton } from './auth-google-button';

describe('GoogleAuthButton', () => {
  let component: AuthGoogleButton;
  let fixture: ComponentFixture<AuthGoogleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGoogleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthGoogleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
