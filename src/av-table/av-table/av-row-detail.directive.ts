import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output, SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {AvTableColumnConfig} from './AvTableColumnConfig';

@Directive({
  selector: '[avRowDetail]'
})
export class AvRowDetailDirective implements OnChanges {

  private row: AvTableColumnConfig;
  private templateReference: TemplateRef<any>;
  private _expanded: boolean;


  // change the expanded property of the host
  @HostBinding('class.expanded')
  get expanded(): boolean {
    return this._expanded;
  }

  @Input()
  set avRowDetail(value: AvTableColumnConfig) {
    if (value !== this.row) {
      this.row = value;
    }
  }

  @Input('rowDetailTemplate')
  set template(template: TemplateRef<any>) {
    if (template !== this.templateReference) {
      this.templateReference = template;
    }
  }

  @Input('expanded') onExpanded: boolean;

  @Output() toggleChange = new EventEmitter<AvRowDetailDirective>();

  constructor(public viewContainer: ViewContainerRef) { }

  showDetail(): void {
    if (this._expanded) {
      this.viewContainer.clear();
    } else {
      this.render();
    }
  }

  private render(): void {
    this.viewContainer.clear();
    if (this.templateReference && this.row) {
      this.viewContainer.createEmbeddedView(this.templateReference, { $implicit: this.row });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onExpanded']) {
      if (changes['onExpanded'].currentValue === true) {
        this.render();
      } else {
        this.viewContainer.clear();
      }
    }
  }
}
