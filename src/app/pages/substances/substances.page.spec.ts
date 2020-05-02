import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstancesPage } from './substances.page';

describe('SubstancesPage', () => {
  let component: SubstancesPage;
  let fixture: ComponentFixture<SubstancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstancesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
