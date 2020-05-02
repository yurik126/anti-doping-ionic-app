import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SifreModalComponent } from './sifre-modal.component';

describe('SifreModalComponent', () => {
  let component: SifreModalComponent;
  let fixture: ComponentFixture<SifreModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SifreModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SifreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
