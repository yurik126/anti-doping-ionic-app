import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelifModalComponent } from './telif-modal.component';

describe('TelifModalComponent', () => {
  let component: TelifModalComponent;
  let fixture: ComponentFixture<TelifModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelifModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelifModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
