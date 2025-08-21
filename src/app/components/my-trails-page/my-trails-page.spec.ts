import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTrailsPage } from './my-trails-page';

describe('MyTrailsPage', () => {
  let component: MyTrailsPage;
  let fixture: ComponentFixture<MyTrailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTrailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTrailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
