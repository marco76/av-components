import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvTablePropertiesPanelComponent } from './av-table-properties-panel.component';

describe('AvTablePropertiesPanelComponent', () => {
  let component: AvTablePropertiesPanelComponent;
  let fixture: ComponentFixture<AvTablePropertiesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvTablePropertiesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvTablePropertiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
