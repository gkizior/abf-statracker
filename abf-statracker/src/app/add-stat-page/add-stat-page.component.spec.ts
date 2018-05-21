import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatPageComponent } from './add-stat-page.component';

describe('AddStatPageComponent', () => {
  let component: AddStatPageComponent;
  let fixture: ComponentFixture<AddStatPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
