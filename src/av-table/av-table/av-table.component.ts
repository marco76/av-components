import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatCheckboxChange, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AvTableConfig} from './AvTableConfig';
import {AvTableColumnConfig} from './AvTableColumnConfig';
import {MatDialog} from '@angular/material/dialog';
import {AvEditorComponent} from '../av-editor/av-editor.component';
import {AVTableTransaction} from './AVTableTransaction';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {AvConfigurationPanelComponent} from '../av-configuration-panel/av-configuration-panel.component';
import {AvColumnType} from './AvColumnType';
import {AvTableStatus} from './AvTableStatus';
import {AvRowDetailDirective} from './av-row-detail.directive';

@Component({
  selector: 'app-av-table',
  templateUrl: './av-table.component.html',
  styleUrls: ['./av-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemStatus',
      [state('deleted', style(
        {display: 'none'}
      )),
        transition('* => deleted',
          animate('1.5s 10ms',
            keyframes([
              style({opacity: '1', background: '#ff5050'}),
              style({opacity: '0.5'}),
              style({opacity: '0.4'}),
              style({opacity: '0.3'}),
              style({opacity: '0.1'}),
            ])))
      ]),
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class AvTableComponent implements OnChanges, OnInit, AfterViewInit {

  private _dataSet: MatTableDataSource<any> | Array<any>;

  // Data source: a dataSource or an array must be passed as parameter
  @Input() // dataSet: MatTableDataSource<any> | Array<any>;
  get dataSet(): MatTableDataSource<any> | Array<any> {
    return this._dataSet;
  }

  set dataSet(data: MatTableDataSource<any> | Array<any>) {
    if (this._dataSet !== data) {
      console.log('mark_for_check');
      this.changeDetector.markForCheck();
    }
    this._dataSet = data;
    console.log('data reassigned');
  }

  @Input() tableStatus?: AvTableStatus;

  // The AvTableConfig contains the configuration of the table and the columns
  @Input() configuration?: AvTableConfig = new AvTableConfig([]);

  @Output() transaction?: EventEmitter<AVTableTransaction> = new EventEmitter<AVTableTransaction>();
  @Input() transactionStatus?: string;

  private paginator: MatPaginator;
  private sort: MatSort;
  detailData: Array<AvTableColumnConfig> = [];

  isExpansionDetailRow = (index: any, row: any) => row.hasOwnProperty('detailRow');
  @Input() singleChildRowDetail: boolean;

  private openedRow: AvRowDetailDirective;

  @ViewChild(MatSort) set matSort(matsort: MatSort) {
    this.sort = matsort;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @ViewChild('panelTemplate') panelTemplate: ElementRef;
  @ViewChild('gridTemplate') gridTemplate: ElementRef;


  // https://github.com/angular/material2/issues/10205 : without this declaration it doesn't work//
  setDataSourceAttributes() {
    if (this.dataSource) {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
    }
  }

  dataSource: MatTableDataSource<any>;
  dataArray: Array<any>;
  demoMode = false;

  standardColumns: Array<AvTableColumnConfig>;
  standardColumnsEnd: Array<AvTableColumnConfig> = [{fieldName: 'expand', label: 'expand'}];
  columnsToShow: Array<string> = [];
  selectedRows: Array<any> = [];
  isSelectionEditable = false;
  isSelectionDeletable = false;
  numberOfSelectedItems = 0;

  dataColumns: Array<AvTableColumnConfig>;

  constructor(public dialog: MatDialog, private changeDetector: ChangeDetectorRef) {}

  onCheckAll($event: any) {
    this.selectedRows = [];

    if ($event.checked) {
      this.setAllRecords(true);
    } else {
      this.setAllRecords(false);
    }

    this.setStatusActions();
  }

  onCheckElement($event: MatCheckboxChange, row: any) {
    if ($event.checked) {
      this.selectedRows.push(row);
    } else {
      const index = this.selectedRows.indexOf(row);
      this.selectedRows.splice(index, 1);
    }

    this.setStatusActions();
  }

  public setStatusActions(): void {

    this.numberOfSelectedItems = this.selectedRows.length;

    if (!this.configuration) {

      this.isSelectionDeletable = this.numberOfSelectedItems > 0;
      this.isSelectionEditable = this.numberOfSelectedItems === 1;

    } else {

      if (this.configuration.tableActions.deletableRecord) {
        this.isSelectionDeletable = this.numberOfSelectedItems > 0;
      }

      if (this.configuration.tableActions.editableRecord) {
        this.isSelectionEditable = this.numberOfSelectedItems === 1;
      }
    }
  }

  getSelected() {
    let selected = 0;
    if (this.dataSource.data) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].isSelected) {
          selected++;
        }
      }
    }
    return selected;
  }

  setAllRecords(status: boolean): void {
    this.numberOfSelectedItems = 0;
    this.selectedRows = [];

    if (this.dataSource.data) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].isSelected = status;
        if (status) {
          this.selectedRows.push(this.dataSource.data[i]);
        }
      }
      this.numberOfSelectedItems = this.dataSource.data.length;
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.dataSource);
    console.log('after view init', this.paginator);
    if (this.configuration) {
      const isReadOnly = this.setReadOnly(this.configuration);
      if (this.configuration.properties){
      this.standardColumns = this.configuration.properties.isReadonly ? [] : [{fieldName: 'select', label: 'select'}];
    }}
  }

  private setReadOnly(configuration: AvTableConfig) {
    if ( !configuration ) {
      return true;
    }
    if ( !configuration.properties ) {
      return true;
    }

    if (this.configuration) {
      return this.configuration.properties;
    }
  }

  applyFilter(filterValue: string) {
    // Remove whitespace
    filterValue = filterValue.trim();
    // Datasource defaults to lowercase matches
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transactionStatus) {
      if (this.demoMode || changes.transactionStatus.currentValue === 'committed') {
        for (const item of this.selectedRows) {
          item.status = 'deleted';
          const position = this.dataSource.data.indexOf(item);

          this.dataSource.data.splice(position, 1);
          this.transactionStatus = undefined;
        }
        this.selectedRows = [];
        this.setStatusActions();
      }
    }
    /*
    if (changes.configuration){
      this.updateTableConfiguration(changes.configuration.currentValue as AvTableConfig);
    }*/

    if (changes.dataSet) {
        this.initTable();
    }
      //if (!this.columnsToShow) {
        //this.dataColumns = this.searchColumnDefinition(this.dataSet[0]);
        //this.columnsToShow = this.setColumnsToShow(this.standardColumns, this.dataColumns, this.standardColumnsEnd);
   // }

  }

  private setColumnsToShow(standardColBegin: Array<AvTableColumnConfig>,
                           appColumns: Array<AvTableColumnConfig>,
                           standardColEnd: Array<AvTableColumnConfig>): Array<string> {

    const columns: Array<string> = [];

    if (typeof standardColBegin !== 'undefined') {
      for (const column of standardColBegin) {
        columns.push(column.fieldName);
      }
    }

    for (const column of appColumns) {
      if (!column.hide) {
        columns.push(column.fieldName);
      }

      if (column.hide && column.showInDetail) {
        this.detailData.push(column); }
    }

    for (const column of standardColEnd) {
      columns.push(column.fieldName);
    }

    return columns;
  }

  searchColumnDefinition(dataObject: any): Array<AvTableColumnConfig> {
    const keys: Array<AvTableColumnConfig> = [];

    for (const name of Object.keys(dataObject)) {
      keys.push({fieldName: name, label: name});
    }
    return keys;
  }

  ngOnInit(): void {
    console.log('ngOnInit');

    this.initTable();
  }

  onCreateRecord(): void {

    const dialogRef = this.dialog.open(AvEditorComponent, {
      panelClass : 'confirm-action-dialog',
      data: {dataColumns: this.dataColumns}
    });
  }

  onEditRecord(): void {
    const dialogRef = this.dialog.open(AvEditorComponent, {
      panelClass : 'confirm-action-dialog',
      data: {dataColumns: this.dataColumns, edited: this.selectedRows[0]}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('result', result);
        if (this.transaction) {
          this.transaction.emit(result);
        }
      }
    );
  }

  onDelete(): void {
    if (!this.demoMode) {
      if(this.transaction) {
        this.transaction.emit({deletedRecords: this.selectedRows});
      }
    } else {
      this.deleteRow();
    }
  }

  onEditRows(): void {
    console.log('onEditRows');
    const dialogRef = this.dialog.open(AvConfigurationPanelComponent,
      {
        height: '600px',
        width: '600px',
        data: {columnsDefinition: this.dataColumns, tableConfiguration: this.configuration}
      }
    );

    dialogRef.afterClosed()
      .subscribe(
      result => {
        console.log('subs', result);
        if(this.transaction) {
          this.transaction.emit(result);
        }
        /*
        let config = <AvTableConfig> result;
        if (result) {
          console.log('columnsToShow', this.dataColumns);
          this.dataColumns = config.columnDefinition;
          this.columnsToShow = this.setColumnsToShow(this.standardColumns, config.columnDefinition);
          this.dataSource = null;
         this.dataSource = new MatTableDataSource<any>(this.dataArray);
        }*/
      }
    );
  }

  getDataColumns() {
    return JSON.stringify(this.dataColumns);
  }

  deleteRow() {
    for (const item of this.selectedRows) {
          item.status = 'deleted';
          const position = this.dataSource.data.indexOf(item);

          this.dataSource.data.splice(position, 1);
          this.transactionStatus = undefined;
        }
        this.selectedRows = [];
        this.setStatusActions();
  }

  isColumnDate(column: AvTableColumnConfig) {
    return AvColumnType.DATE === column.type;
  }

  isColumnTable(column: AvTableColumnConfig) {
    return AvColumnType.TABLE === column.type;
  }

  isTableReadonly() {
    if (this.tableStatus && !this.tableStatus.editable) {
      return true;
    }
    return false;
  }

  getTableStatusReason() {
    if (this.tableStatus && this.tableStatus.statusReason) {
      return this.tableStatus.statusReason;
    }
    return '';
  }

  getStyle(cell: AvTableColumnConfig): any {
    if (cell && cell.width) {
      return {'flex': cell.width};
    }

    return {'flex': 1.1};
  }

  onSelectExpand(row: any) {
    console.log('expand', row);
    row.selectedTemplate = this.panelTemplate;
    if (typeof row.isExpanded === 'undefined') {
      row.isExpanded = false;
    }
    row.isExpanded = !row.isExpanded;
  }

  onDetailGrid(row: any, data: string) {
    row.selectedTemplate = this.gridTemplate;
    if (typeof row.isExpanded === 'undefined') {
      row.isExpanded = false;
    }

    row.isExpanded = !row.isExpanded;
    row.selectedColumn = data;
  }

  public standardDetailGridConfiguration = new AvTableConfig([], {isReadonly : true});

  isPdf(rowElement: any) {
     if (rowElement && typeof rowElement === 'string' && rowElement.startsWith('JVBERi0x')) {
      return true;
    }

    return false;
  }

  private initTable() {
    console.log('init table');
    this.changeDetector.detach();
    if (this._dataSet instanceof MatTableDataSource) {
      this.dataSource = this._dataSet;
    } else if (this._dataSet instanceof Array) {
      this.dataArray = this._dataSet;
    }

    if (this.dataArray) {
      this.dataSource = new MatTableDataSource<any>(this.dataArray);
    }

    this.dataColumns = [];

    //cool they gave us some config to build the columns
    if (this.configuration && this.configuration.columnDefinition) {
      for (const item of this.configuration.columnDefinition) {
        this.dataColumns.push(item);
      }
      this.columnsToShow = this.setColumnsToShow(this.standardColumns, this.dataColumns, this.standardColumnsEnd);
    } else { // we try to extract the definition from the dataset
      if (this.dataSource.data.length > 0) {
        this.dataColumns = this.searchColumnDefinition(this.dataSource.data[0]);
        if (this.columnsToShow.length === 0) {
          this.columnsToShow = this.setColumnsToShow(this.standardColumns, this.dataColumns, this.standardColumnsEnd);
        }
      }
    }

    this.changeDetector.reattach();
  }


}
