import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsPage } from './prescriptions.page';

describe('PrescriptionsPage', () => {
  let component: PrescriptionsPage;
  let fixture: ComponentFixture<PrescriptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
