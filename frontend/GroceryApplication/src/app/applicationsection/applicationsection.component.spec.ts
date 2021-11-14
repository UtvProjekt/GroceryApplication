import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsectionComponent } from './applicationsection.component';

describe('ApplicationsectionComponent', () => {
  let component: ApplicationsectionComponent;
  let fixture: ComponentFixture<ApplicationsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
