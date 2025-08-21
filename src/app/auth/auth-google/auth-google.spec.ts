import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthGoogle } from './auth-google';

describe('AuthGoogle', () => {
  let component: AuthGoogle;
  let fixture: ComponentFixture<AuthGoogle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGoogle],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthGoogle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
