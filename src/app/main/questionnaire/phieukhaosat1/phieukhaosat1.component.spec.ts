import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phieukhaosat1Component } from './phieukhaosat1.component';

describe('Phieukhaosat1Component', () => {
  let component: Phieukhaosat1Component;
  let fixture: ComponentFixture<Phieukhaosat1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phieukhaosat1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phieukhaosat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
