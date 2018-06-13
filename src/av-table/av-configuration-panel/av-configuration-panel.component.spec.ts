import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvConfigurationPanelComponent } from './av-configuration-panel.component';

describe('AvConfigurationPanelComponent', () => {
  let component: AvConfigurationPanelComponent;
  let fixture: ComponentFixture<AvConfigurationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvConfigurationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvConfigurationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
