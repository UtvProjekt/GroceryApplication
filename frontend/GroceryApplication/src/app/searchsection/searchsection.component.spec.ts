import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsectionComponent } from './searchsection.component';

describe('SearchsectionComponent', () => {
  let component: SearchsectionComponent;
  let fixture: ComponentFixture<SearchsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchsectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
