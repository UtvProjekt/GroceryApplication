import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizemenuComponent } from './organizemenu.component';

describe('OrganizemenuComponent', () => {
  let component: OrganizemenuComponent;
  let fixture: ComponentFixture<OrganizemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
