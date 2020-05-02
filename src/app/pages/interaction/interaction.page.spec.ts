import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionPage } from './interaction.page';

describe('InteractionPage', () => {
  let component: InteractionPage;
  let fixture: ComponentFixture<InteractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
