import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExTableConfigOneComponent } from './ex-table-config-one.component';

describe('ExTableConfigOneComponent', () => {
  let component: ExTableConfigOneComponent;
  let fixture: ComponentFixture<ExTableConfigOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExTableConfigOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExTableConfigOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
