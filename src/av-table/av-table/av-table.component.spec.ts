import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvTableComponent } from './av-table.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../modules/material/material.module';
import {AvTableConfig} from './AvTableConfig';
const materialModules = [
  MaterialModule,
  NoopAnimationsModule
];


describe('AvTableComponent', () => {
  let component: AvTableComponent;
  let fixture: ComponentFixture<AvTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvTableComponent],
      imports: [materialModules],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvTableComponent);
    component = fixture.componentInstance;
    component.dataSet = [{'name': 'test 1'}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be readonly', () => {
    expect(component.isTableReadOnly).toBe(true);
  });

  it ('should allow editing', () => {
    component.configuration.tableConfig = new AvTableConfig(false);
    component.initTable();
    expect(component.isTableReadOnly).toBe(true);
  });
});
