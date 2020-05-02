import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionDetailsPage } from './interaction-details.page';

describe('InteractionDetailsPage', () => {
  let component: InteractionDetailsPage;
  let fixture: ComponentFixture<InteractionDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
