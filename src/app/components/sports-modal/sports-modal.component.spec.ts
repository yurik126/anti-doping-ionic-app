import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsModalComponent } from './sports-modal.component';

describe('SportsModalComponent', () => {
  let component: SportsModalComponent;
  let fixture: ComponentFixture<SportsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
