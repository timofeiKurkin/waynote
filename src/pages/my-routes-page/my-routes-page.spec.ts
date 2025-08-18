import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRoutesPage } from './my-routes-page';

describe('MyRoutesPage', () => {
  let component: MyRoutesPage;
  let fixture: ComponentFixture<MyRoutesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRoutesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
