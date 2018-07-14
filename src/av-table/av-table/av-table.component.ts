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
import {AVTableTransaction} from './AVTableTransaction';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {AvConfigurationPanelComponent} from '../av-configuration-panel/av-configuration-panel.component';
import {AvColumnType} from './AvColumnType';
import {AvTableStatus} from './AvTableStatus';
import {AvRowDetailDirective} from './av-row-detail.directive';
import {buildPDF} from '../export/FileHandler';
import {AvConfirmDialogComponent} from '../av-confirm-dialog/av-confirm-dialog.component';
import {AvConfirmDialogResponseType} from '../av-confirm-dialog/AvConfirmDialogResponseType';
import {AvEditorComponent} from '../../av-form/av-editor/av-editor.component';

@Component({
  selector: 'app-av-table',
  templateUrl: './av-table.component.html',
  styleUrls: ['./av-table.component.scss'],
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

  @Input() singleChildRowDetail: boolean;

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

  private _dataSet: MatTableDataSource<any> | Array<any>;
  private openedRow: AvRowDetailDirective;

  columnPropertiesExtracted: any = {showDetail: false};

  dataSource: MatTableDataSource<any>;
  dataArray: Array<any>;
  demoMode = false;
  tableReadOnly = true;

  technicalColumnsBegin: Array<AvTableColumnConfig>;
  technicalColumnsEnd: Array<AvTableColumnConfig> = [{fieldName: 'expand', label: 'expand'}];
  columnsToShow: Array<string> = [];
  selectedRows: Array<any> = [];
  isSelectionEditable = false;
  isSelectionDeletable = false;
  numberOfSelectedItems = 0;

  dataColumns: Array<AvTableColumnConfig>;

  // Data source: a dataSource or an array must be passed as parameter
  @Input()
  get dataSet(): MatTableDataSource<any> | Array<any> {
    return this._dataSet;
  }

  set dataSet(data: MatTableDataSource<any> | Array<any>) {
    if (this._dataSet !== data) {
      this.changeDetector.markForCheck();
    }
    this._dataSet = data;
  }

  @Input() tableStatus?: AvTableStatus;

  // The AvTableConfig contains the configuration of the table and the columns
  @Input() configuration?: AvTableConfig = new AvTableConfig(null);

  @Output() transaction?: EventEmitter<AVTableTransaction> = new EventEmitter<AVTableTransaction>();
  @Input() transactionStatus?: string;

  private paginator: MatPaginator;
  private sort: MatSort;
  detailData: Array<AvTableColumnConfig> = [];

  ngOnInit(): void {
    this.initTable();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialog: MatDialog, private changeDetector: ChangeDetectorRef) {
  }

  onCheckAll($event) {
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

  get isTableReadOnly() {
    return this.tableReadOnly;
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
    this.initializeTechnicalColumns();
  }

  private initializeTechnicalColumns() {
    this.technicalColumnsBegin = [];

    if (this.isTechnicalColumnsBeginVisible(this.tableStatus, this.configuration)) {
      this.tableReadOnly = false;
    } else {
      this.tableReadOnly = true;
    }

    // show the select checkbox only if record and table are editable
    if (!this.tableReadOnly) {
      this.technicalColumnsBegin.push({fieldName: 'select', label: 'select'});
    }
  }

  /**
   * Check if the table configuration and the table content allow to update the content
   * @param {AvTableStatus} tableStatus
   * @param {AvTableConfig} tableConfiguration
   * @returns {boolean}
   */
  private isTechnicalColumnsBeginVisible(tableStatus: AvTableStatus, tableConfiguration: AvTableConfig) {
    let visibility = false;

    if (this.tableStatus) {
      if (this.tableStatus.editable) {
        visibility = true;
      } else if (this.tableStatus.editable === false) {
        visibility = false;
        return visibility;
      }
    }

    if (this.configuration) {
      if (this.configuration.properties) {
        if (this.configuration.properties.isReadonly) {
          visibility = false;
        }
      }
    }
    return visibility;
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
          this.transactionStatus = null;
        }
        this.selectedRows = [];
        this.setStatusActions();
      }
    }
    if (changes.dataSet) {
      this.initTable();
    }
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
        this.detailData.push(column);
      }
    }

    for (const column of standardColEnd) {
      if (this.columnPropertiesExtracted.showDetail) {
        columns.push(column.fieldName);
      }
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

  onCreateRecord(): void {
    const dialogRef = this.dialog.open(AvEditorComponent, {
      minWidth: '450px',
      height: '75vh',
      // 13.06.2018 panelClass to set width and height was KO
      data: {dataColumns: this.dataColumns}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.transaction.emit(result);
      }
    );
  }

  onEditRecord(): void {
    const dialogRef = this.dialog.open(AvEditorComponent, {
      minWidth: '450px',
      maxHeight: '75vh',
      // 13.06.2018 panelClass to set width and height was KO
      data: {dataColumns: this.dataColumns, edited: this.selectedRows[0]}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('result', result);
        this.transaction.emit(result);
      }
    );
  }

  onDelete(): void {
    if (!this.demoMode) {
      const dialogRef = this.dialog.open(AvConfirmDialogComponent, {
        minWidth: '450px',
        maxHeight: '75vh'
      });

      dialogRef.afterClosed().subscribe(
        result => {
          switch (result) {
            case AvConfirmDialogResponseType.OK:
            { this.transaction.emit({deletedRecords: this.selectedRows}); break; }
            default: break;
        }}
      );
    } else {
      this.deleteRow();
    }
  }

  onEditRows(): void {
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
          this.transaction.emit(result);
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
      this.transactionStatus = null;
    }
    this.selectedRows = [];
    this.setStatusActions();
  }

  isColumnDate(column: AvTableColumnConfig) {
    return AvColumnType.DATE === column.type;
  }

      isColumnArray(column: AvTableColumnConfig): boolean {
    return AvColumnType.ARRAY === column.type;
  }

  isColumnTable(column: AvTableColumnConfig) {
    return AvColumnType.TABLE === column.type;
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

  getClass(cell: AvTableColumnConfig) {
    if (AvColumnType.FILE === cell.type) {
      return 'download';
    }
  }

  onSelectExpand(row: any) {

    row.selectedTemplate = this.panelTemplate;
    if (typeof row.isExpanded === 'undefined') {
      row.isExpanded = false;
    }
    row.isExpanded = !row.isExpanded;
  }

  onDetailGrid(row: any, data: string, column: AvTableColumnConfig) {

    row.selectedTemplate = this.gridTemplate;
    if (typeof row.isExpanded === 'undefined') {
      row.isExpanded = false;
    }

    row.isExpanded = !row.isExpanded;
    row.selectedColumn = data;
  }

  getDetailConfiguration(column: any): AvTableConfig {
    for (let i = 0; i < this.dataColumns.length; i++) {
      if (column === this.dataColumns[i].fieldName) {
        if (this.dataColumns[i].detailTable) {
          return this.dataColumns[i].detailTable;
        } else {
          return new AvTableConfig(null, {isReadonly: true});
        }
      }
    }
    return new AvTableConfig([], {isReadonly: true});
  }

  isText(column: AvTableColumnConfig) {
    if (!column.type) {
      return true;
    }

    if (column.type === AvColumnType.STRING) {
      return true;
    }
    if (column.type === AvColumnType.ANY) {
      return true;
    }
    if (column.type === AvColumnType.NUMBER) {
      return true;
    }

    return false;
  }

  isPdf(column: AvTableColumnConfig) {
    return AvColumnType.FILE === column.type;
  }

  onDownloadFile(content: string) {
    buildPDF(content);
  }

  public initTable() {
    this.changeDetector.detach();

    if (this._dataSet instanceof MatTableDataSource) {
      this.dataSource = this._dataSet;
    } else if (this._dataSet instanceof Array) {
      this.dataArray = this._dataSet;
    }

    if (this.dataArray) {
      this.dataSource = new MatTableDataSource<any>(this.dataArray);
    }

    this.initializeTechnicalColumns();
    this.dataColumns = [];

    // cool they gave us some config to build the columns
    if (this.configuration && this.configuration.columnDefinition) {
      for (const item of this.configuration.columnDefinition) {
        this.dataColumns.push(item);
        this.calculateColumnsProperties(item);
      }
      this.columnsToShow = this.setColumnsToShow(this.technicalColumnsBegin, this.dataColumns, this.technicalColumnsEnd);
    } else { // we try to extract the definition from the dataset
      if (this.dataSource.data.length > 0) {
        this.dataColumns = this.searchColumnDefinition(this.dataSource.data[0]);
        if (this.columnsToShow.length === 0) {
          this.columnsToShow = this.setColumnsToShow(this.technicalColumnsBegin, this.dataColumns, this.technicalColumnsEnd);
        }
      }
    }

    this.changeDetector.reattach();
  }

  private calculateColumnsProperties(property: AvTableColumnConfig) {
    if (property.hide) {
      this.columnPropertiesExtracted.showDetail = true;
    }
  }
}
