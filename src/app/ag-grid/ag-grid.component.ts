import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { GridDatePickerComponent } from '../grid-components/grid-date-picker.component';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
  templateUrl: 'ag-grid.component.html'
})
export class AgGridComponent implements OnInit {
  // agGrid
  private gridApi;
  private gridColumnApi;
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  bpps: any[];

  source: any;
  columns: any[];
  dataAdapter: any;
  localization: any;

  // Grid Data CRUD stuff
  selectedRowIndex: number;
  selectedRowIndexChanged: boolean = false;
  selectedRowIndexIsNew: boolean = false;
  lastCellName = 'comment';
  firstCellName = 'effectiveDateTime';
  lastCellSelected: boolean;
  lastRowSelected: boolean;

  gridRowsCount: number;
  allowNewGridRow: boolean = false;
  addDatarowPending: boolean = false;

  patientId: number;

  // Local Lookup Data
  careProviders: any[] = ['ANAEST', 'CHI', 'ERP', 'HM', 'MED', 'MM', 'MPO'];

  bodySiteLookup: any[] = [
    { value: 'Undefined', text: '-', default: true },
    { value: 'RightArm', text: 'Rechts', default: false },
    { value: 'LeftArm', text: 'Links', default: false }
  ];

  bodySites = {
    Undefined: '-',
    RightArm: 'Rechts',
    LeftArm: 'Links'
  };

  bloodPressureMeasurementPositionLookup: any[] = [
    { value: 'Undefined', text: '-', default: true },
    { value: 'Sitting', text: 'Sitzend', default: false },
    { value: 'Horizontal', text: 'Liegend', default: false },
    { value: 'Standing', text: 'Stehend', default: false },
    { value: 'PostEum', text: 'Nach Aufstehen', default: false }
  ];

  measurementPositions = {
    Undefined: '-',
    Sitting: 'Sitzend',
    Horizontal: 'Liegend',
    Standing: 'Stehend',
    PostEum: 'Nach Aufstehen'
  };

  pulseQualityLookup: any[] = [
    { value: 'Undefined', text: '-', default: true },
    { value: 'Regularis', text: 'Regularis', default: false },
    { value: 'ES', text: 'ES', default: false },
    { value: 'Parvus', text: 'Parvus', default: false },
    { value: 'RespArrhythm', text: 'RespArrhythm', default: false }
  ];

  pulseQualities = {
    Undefined: '-',
    Regularis: 'Regularis',
    ES: 'ES',
    Parvus: 'Parvus',
    RespArrhythm: 'RespArrhythm'
  };

  constructor() {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    const columns = params.columnApi.getAllDisplayedVirtualColumns();
    const colIds = columns.map(column => {
      return column.colId;
    });
  }

  ngOnInit() {
    this.bpps = [
      {
        id: 130,
        patientId: 1,
        careProviderId: 'HM',
        rowNo: 0,
        systolic: 12,
        diastolic: 120,
        pulse: 120,
        pulseQuality: 'Undefined',
        bodySite: 'LeftArm',
        bloodPressureMeasurementPosition: 'Horizontal',
        comment: 'sasasasasassa',
        effectiveDateTime: '2018-03-07T15:35:59.467Z',
        rowVersion: 'AAAAAAABw2o='
      },
      {
        id: 140,
        patientId: 1,
        careProviderId: 'HM',
        rowNo: 0,
        systolic: 25,
        diastolic: 125,
        pulse: 90,
        pulseQuality: 'Undefined',
        bodySite: 'RightArm',
        bloodPressureMeasurementPosition: 'Standing',
        comment: 'ok',
        effectiveDateTime: '2018-03-07T15:40:28.363Z',
        rowVersion: 'AAAAAAAAR8c='
      },
      {
        id: 143,
        patientId: 1,
        careProviderId: 'MED',
        rowNo: 0,
        systolic: 3,
        diastolic: 2,
        pulse: 0,
        pulseQuality: 'Undefined',
        bodySite: 'RightArm',
        bloodPressureMeasurementPosition: 'Horizontal',
        comment: 'sdf',
        effectiveDateTime: '2017-01-01T16:08:12Z',
        rowVersion: 'AAAAAAABw3w='
      },
      {
        id: 1430,
        patientId: 1,
        careProviderId: 'HM',
        rowNo: 0,
        systolic: 4,
        diastolic: 1,
        pulse: 100,
        pulseQuality: 'Undefined',
        bodySite: 'RightArm',
        bloodPressureMeasurementPosition: 'Horizontal',
        comment: 'sdf',
        effectiveDateTime: '2017-01-01T16:08:12Z',
        rowVersion: 'AAAAAAABw3w='
      },
      {
        id: 113,
        patientId: 1,
        careProviderId: 'MM',
        rowNo: 0,
        systolic: 30,
        diastolic: 7,
        pulse: 90,
        pulseQuality: 'Undefined',
        bodySite: 'RightArm',
        bloodPressureMeasurementPosition: 'Horizontal',
        comment: 'sdf',
        effectiveDateTime: '2017-01-01T16:08:12Z',
        rowVersion: 'AAAAAAABw3w='
      }
    ];
    this.bindGridData(this.bpps);
  }

  validateFunc(datafield, value) {
    console.log('validator', datafield);
    switch (datafield.datafield) {
      case 'pulse':
        if (value > 200) {
          return { message: 'Your pulse is too high', result: false };
        }
        return true;
    }
    return true;
  }

  bindGridData(data: any[]) {
    // agGrid

    this.gridOptions = <GridOptions>{
      rowSelection: 'single',
      defaultColDef: {
        // set every column width
        width: 100,
        // make every column editable
        editable: true,
        // make every column use 'text' filter by default
        filter: 'agTextColumnFilter'
      },
      headerHeight: 28,
      rowHeight: 34,
      columnTypes: {
        nonEditableColumn: { editable: false },
        dateColumn: {
          filter: 'agDateColumnFilter',
          // filterParams: { comparator: myDateComparator },
          suppressMenu: true
        }
      },
      frameworkComponents: {
        dateEditor: GridDatePickerComponent
        // wysiwygEditor: GridWysiwygComponent,
        // numericEditor: GridNumericEditorComponent
      }
    };

    this.columnDefs = [
      {
        headerName: 'Datum',
        field: 'effectiveDateTime',
        rowDrag: true,
        width: 110,
        cellEditor: 'dateEditor',
        valueFormatter: this.dateFormatter
      },
      {
        headerName: 'Wer',
        field: 'careProviderId',
        width: 80,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.careProviders.map(p => {
            return `${p.id}`;
          })
        }
      },
      {
        headerName: 'BD syst.',
        field: 'systolic',
        width: 80,
        type: 'numericColumn',
        cellEditor: 'numericEditor'
      },
      {
        headerName: 'BD diast.',
        field: 'diastolic',
        width: 80,
        type: 'numericColumn'
      },
      { headerName: 'Pulse', field: 'pulse', width: 80, type: 'numericColumn' },
      {
        headerName: 'Pulse Quality',
        field: 'pulseQualityId',
        width: 80,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: this.extractValues(this.pulseQualities) },
        valueFormatter: params => {
          return this.lookupValue(this.pulseQualities, params.value);
        },
        valueParser: params => {
          return this.lookupKey(this.pulseQualities, params.newValue);
        }
      },
      {
        headerName: 'Seite',
        field: 'bodySiteId',
        width: 80,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: { values: this.extractValues(this.bodySites) },
        valueFormatter: params => {
          return this.lookupValue(this.bodySites, params.value);
        },
        valueParser: params => {
          return this.lookupKey(this.bodySites, params.newValue);
        }
      },
      {
        headerName: 'Lage',
        field: 'bloodPressureMeasurementPositionId',
        width: 80,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.extractValues(this.measurementPositions)
        },
        valueFormatter: params => {
          return this.lookupValue(this.measurementPositions, params.value);
        },
        valueParser: params => {
          return this.lookupKey(this.measurementPositions, params.newValue);
        }
      },
      {
        headerName: 'Assessment',
        field: 'comment',
        cellHeight: 400,
        width: 150,
        cellEditor: 'wysiwygEditor'
        // cellEditor: 'agLargeTextCellEditor'
      }
    ];

    this.rowData = data;
  }

  dateFormatter(params) {
    return moment(params.value).format('DD.MM.YYYY');
  }

  extractValues(mappings) {
    // console.log('extractValues', mappings);
    return Object.keys(mappings);
  }
  lookupValue(mappings, key) {
    // console.log('lookupValue', key);
    return mappings[key];
  }
  lookupKey(mappings, name) {
    console.log('lookupKey', name);
    for (const key in mappings) {
      if (mappings.hasOwnProperty(key)) {
        if (name === mappings[key]) {
          console.log('return key', key);
          return key;
        }
      }
    }
  }

  // getEntityByRowIndex(selectedRowIndex: number): any {
  //   const rowdata = this.widgetGrid.getrowdata(selectedRowIndex);
  //   const selected: any = this.bpps.filter(function(el) {
  //     return el.id === rowdata.id;
  //   })[0];

  //   return selected;
  // }

  gridCellEditingStarted(event: any): void {
    console.log('gridCellEditingStarted', event);
    this.selectedRowIndexChanged = true;
  }

  gridCellEditingStopped(event: any): void {
    console.log('gridCellEditingStopped', event);
    console.log('data', this.bpps);
  }

  gridModelUpdated(event: any): void {
    console.log('gridModelUpdated', event);
  }

  gridCellFocused(event: any): void {
    console.log('gridCellFocused', event);
  }

  // gridOnCellSelect(event: any): void {
  //   // Handle Grid changes
  //   if (
  //     this.selectedRowIndex !== event.args.rowindex &&
  //     this.selectedRowIndexChanged
  //   ) {
  //     console.log('saving data for row:', this.selectedRowIndex);
  //     this.saveGridData(this.widgetGrid.getrowdata(this.selectedRowIndex));
  //   }

  //   this.selectedRowIndex = event.args.rowindex;
  //   console.log('gridOnCellSelect:selectedRowIndex', this.selectedRowIndex);
  //   this.gridRowsCount = this.widgetGrid.getrows().length;
  //   this.lastCellSelected = event.args.datafield === this.lastCellName;
  //   // this.gridRows = this.widgetGrid.getdatainformation().rowscount;

  //   if (this.selectedRowIndex === this.gridRowsCount - 1) {
  //     this.lastRowSelected = true;
  //   } else {
  //     this.lastRowSelected = false;
  //   }

  //   if (this.lastCellSelected && this.lastRowSelected) {
  //     this.allowNewGridRow = true;
  //   } else {
  //     this.allowNewGridRow = false;
  //   }
  // }

  // gridOnCellbeginEdit(event: any): void {
  //   this.selectedRowIndexChanged = true;
  // }

  // gridOnCellEndEdit(event: any): void {
  //   console.log('gridOnCellEndEdit', event);

  //   // Manuel compare value for update
  //   if (this.lastCellName === event.args.datafield) {
  //     const entity = this.getEntityByRowIndex(event.args.rowindex);

  //     if (entity[event.args.datafield] !== event.args.value) {
  //       // entity[event.args.datafield] = event.args.value;

  //       const entityMerged: any = {
  //         ...entity,
  //         ...this.widgetGrid.getrowdata(event.args.rowindex)
  //       };
  //       entityMerged[event.args.datafield] = event.args.value;
  //       this.saveData(entityMerged);
  //     }
  //   }
  // }

  // gridOnCellvaluechanged(event: any): void {
  //   this.selectedRowIndexChanged = true;
  // }

  // handleKeyboardNavigationhandleKeyboardNavigation = (event: any): boolean => {
  //   // Ugly Hack because handleKeyboardNavigation is called twice
  //   // https://www.jqwidgets.com/community/topic/handlekeyboardnavigation-event-is-called-twice-when-keypressed/
  //   if (event.timeStamp === this.keyboardHandleTimestamp) {
  //     return false;
  //   }
  //   this.keyboardHandleTimestamp = event.timeStamp;

  //   const key = event.charCode
  //     ? event.charCode
  //     : event.keyCode ? event.keyCode : 0;

  //   // Handle new data rows on tab
  //   if (
  //     (key === 9 && this.allowNewGridRow) ||
  //     (key === 40 && this.lastRowSelected && !this.selectedRowIndexIsNew)
  //   ) {
  //     this.addNewRow();
  //   } else if (key === 13) {
  //     console.log('enter - edit', this.selectedRowIndex);
  //     return true;
  //   } else if (key === 27 && this.selectedRowIndexIsNew) {
  //     this.removeUnsavedRow();
  //   } else if (key === 46) {
  //     if (confirm('Wollen Sie den Datensatz wirklich löschen?')) {
  //       this.deleteGridData(this.selectedRowIndex);
  //     }
  //   }

  //   return false;
  //   // tslint:disable-next-line:semicolon
  // };

  saveGridData(rowdata: any) {
    console.log('saveGridData', rowdata);
    const selected: any = this.bpps.filter(function(el) {
      return el.id === rowdata.id;
    })[0];

    const entityModified: any = {
      ...selected,
      ...rowdata
    };

    this.saveData(entityModified);
    this.selectedRowIndexChanged = false;
    this.selectedRowIndexIsNew = false;
  }

  // deleteGridData(selectedRowIndex: any) {
  //   const rowdata = this.widgetGrid.getrowdata(selectedRowIndex);

  //   const selected: any = this.bpps.filter(function(el) {
  //     return el.id === rowdata.id;
  //   })[0];

  //   this.deleteData(selected);
  //   this.selectedRowIndexChanged = false;
  //   this.setGridCellFocus(0);
  // }

  // setGridCellFocus(selectedRowIndex?: number): void {
  //   if (selectedRowIndex == null) {
  //     selectedRowIndex = +this.widgetGrid.getdatainformation().rowscount;
  //     selectedRowIndex--;
  //   }
  //   this.widgetGrid.clearselection();
  //   this.widgetGrid.selectcell(selectedRowIndex, this.firstCellName);
  // }

  saveData(entity: any) {
    console.log('saving data', entity);
  }

  deleteData(entity: any) {
    console.log('deleting data', entity);
  }

  addNewRow(): void {
    console.log('addNewRow');

    const entity: any = {
      id: 0,
      pulse: 0,
      careProviderId: 'HM',
      rowNo: 0,
      systolic: 0,
      diastolic: 0,
      patientId: this.patientId,
      pulseQuality: this.pulseQualityLookup.find(l => l.default).value,
      bodySite: this.bodySiteLookup.find(l => l.default).value,
      bloodPressureMeasurementPosition: this.bloodPressureMeasurementPositionLookup.find(
        l => l.default
      ).value,
      comment: null,
      effectiveDateTime: new Date(),
      rowVersion: null
    };

    this.bpps.push(entity);
    // this.widgetGrid.addrow(null, entity);

    this.allowNewGridRow = false;
    this.selectedRowIndexChanged = false;
    this.selectedRowIndexIsNew = true;
    this.bindGridData(this.bpps);

    // this.setGridCellFocus(this.selectedRowIndex + 1);
  }

  // removeUnsavedRow(): void {
  //   const rowscount = this.widgetGrid.getdatainformation().rowscount;
  //   if (
  //     this.selectedRowIndex >= 0 &&
  //     this.selectedRowIndex < parseFloat(rowscount)
  //   ) {
  //     const id = this.widgetGrid.getrowid(this.selectedRowIndex);
  //     this.widgetGrid.deleterow(id);
  //   }
  //   this.selectedRowIndexIsNew = false;
  //   this.selectedRowIndexChanged = false;
  //   this.bpps = this.bpps.filter(e => e.id !== 0);
  //   this.bindGridData(this.bpps);
  //   this.setGridCellFocus();
  // }
}
