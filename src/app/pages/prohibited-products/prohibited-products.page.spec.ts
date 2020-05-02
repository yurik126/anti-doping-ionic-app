import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProhibitedProductsPage } from './prohibited-products.page';

describe('ProhibitedProductsPage', () => {
  let component: ProhibitedProductsPage;
  let fixture: ComponentFixture<ProhibitedProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProhibitedProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProhibitedProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
