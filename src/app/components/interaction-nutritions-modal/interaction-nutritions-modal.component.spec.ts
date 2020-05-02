import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionNutritionsModalComponent } from './interaction-nutritions-modal.component';

describe('InteractionNutritionsModalComponent', () => {
  let component: InteractionNutritionsModalComponent;
  let fixture: ComponentFixture<InteractionNutritionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionNutritionsModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionNutritionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
