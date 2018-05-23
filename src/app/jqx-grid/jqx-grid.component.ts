import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

@Component({
  templateUrl: 'jqx-grid.component.html'
})
export class JqxGridComponent implements OnInit {
  @ViewChild('widgetGrid') widgetGrid: jqxGridComponent;
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

  // JQX Hacks
  keyboardHandleTimestamp: any;

  // Local Lookup Data
  careProviders: any[] = ['ANAEST', 'CHI', 'ERP', 'HM', 'MED', 'MM', 'MPO'];

  bodySiteLookup: any[] = [
    { value: 'Undefined', text: '-', default: true },
    { value: 'RightArm', text: 'Rechts', default: false },
    { value: 'LeftArm', text: 'Links', default: false }
  ];

  bloodPressureMeasurementPositionLookup: any[] = [
    { value: 'Undefined', text: '-', default: true },
    { value: 'Sitting', text: 'Sitzend', default: false },
    { value: 'Horizontal', text: 'Liegend', default: false },
    { value: 'Standing', text: 'Stehend', default: false },
    { value: 'PostEum', text: 'Nach Aufstehen', default: false }
  ];

  pulseQualityLookup: any[] = [
    { value: 'Undefined', text: '-', default: true },
    { value: 'Regularis', text: 'Regularis', default: false },
    { value: 'ES', text: 'ES', default: false },
    { value: 'Parvus', text: 'Parvus', default: false },
    { value: 'RespArrhythm', text: 'RespArrhythm', default: false }
  ];

  constructor() {}

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
    const bodySiteSource: any = {
      datatype: 'array',
      datafields: [
        { name: 'text', type: 'string' },
        { name: 'value', type: 'string' }
      ],
      localdata: this.bodySiteLookup
    };

    const bodySiteAdaptor: any = new jqx.dataAdapter(bodySiteSource, {
      autoBind: true
    });

    const bloodPressureMeasurementPositionSource: any = {
      datatype: 'array',
      datafields: [
        { name: 'text', type: 'string' },
        { name: 'value', type: 'string' }
      ],
      localdata: this.bloodPressureMeasurementPositionLookup
    };

    const bloodPressureMeasurementPositionAdpator: any = new jqx.dataAdapter(
      bloodPressureMeasurementPositionSource,
      {
        autoBind: true
      }
    );

    this.source = {
      localdata: data,
      datatype: 'array',
      datafields: [
        { name: 'id', type: 'number' },
        { name: 'patientId', type: 'number' },
        { name: 'careProviderId', type: 'string' }, // Wer
        { name: 'row', type: 'number' },
        { name: 'systolic', type: 'number' },
        { name: 'diastolic', type: 'number' },
        { name: 'pulse', type: 'number' },
        { name: 'pulseQuality', type: 'string' },
        {
          name: 'bodySiteLookup',
          value: 'bodySite',
          values: {
            source: bodySiteAdaptor.records,
            value: 'value',
            name: 'text'
          }
        },
        {
          name: 'bodySite',
          type: 'string'
        },
        {
          name: 'bloodPressureMeasurementPositionLookup',
          value: 'bloodPressureMeasurementPosition',
          values: {
            source: bloodPressureMeasurementPositionAdpator.records,
            value: 'value',
            name: 'text'
          }
        },
        {
          name: 'bloodPressureMeasurementPosition',
          type: 'string'
        },
        {
          name: 'comment',
          type: 'string'
        },
        { name: 'effectiveDateTime', type: 'date' }, // Datum
        { name: 'rowVersion', type: 'string' } // Datum
      ]
    };

    this.columns = [
      {
        text: 'Datum',
        columntype: 'datetimeinput',
        datafield: 'effectiveDateTime',
        width: 110,
        filtertype: 'date',
        cellsformat: 'dd.MM.yyyy',
        validation: this.validateFunc
      },
      {
        text: 'Wer',
        datafield: 'careProviderId',
        columntype: 'dropdownlist',
        width: 80,
        createeditor: (row: number, column: any, editor: any): void => {
          editor.jqxDropDownList({
            autoDropDownHeight: true,
            source: this.careProviders
          });
        },
        // update the editor's value before saving it.
        cellvaluechanging: (
          row: number,
          column: any,
          columntype: any,
          oldvalue: any,
          newvalue: any
        ): any => {
          // return the old value, if the new value is empty.
          if (newvalue === '') {
            return oldvalue;
          }
        }
      },
      {
        text: 'BD syst.',
        columntype: 'numberinput',
        datafield: 'systolic',
        width: 70
      },
      {
        text: 'BD diast.',
        columntype: 'numberinput',
        datafield: 'diastolic',
        width: 70
      },
      {
        text: 'Puls',
        columntype: 'numberinput',
        datafield: 'pulse',
        width: 60,
        validation: this.validateFunc
      },
      {
        text: 'Seite',
        datafield: 'bodySite',
        displayfield: 'bodySiteLookup',
        columntype: 'dropdownlist',
        width: 100,
        createeditor: (row: number, column: any, editor: any): void => {
          editor.jqxDropDownList({
            autoDropDownHeight: true,
            source: bodySiteAdaptor,
            displayMember: 'text',
            valueMember: 'value'
          });
        }
      },
      {
        text: 'Lage',
        datafield: 'bloodPressureMeasurementPosition',
        displayfield: 'bloodPressureMeasurementPositionLookup',
        columntype: 'dropdownlist',
        width: 100,
        createeditor: (row: number, column: any, editor: any): void => {
          editor.jqxDropDownList({
            autoDropDownHeight: true,
            source: bloodPressureMeasurementPositionAdpator,
            displayMember: 'text',
            valueMember: 'value'
          });
        }
      },
      {
        text: 'Assessment',
        columntype: 'textbox',
        datafield: 'comment',
        width: 150
      }
    ];

    this.dataAdapter = new jqx.dataAdapter(this.source);

    const localizationobj: any = {};
    localizationobj.pagergotopagestring = 'Gehe zu:';
    localizationobj.pagershowrowsstring = 'Zeige Zeile:';
    localizationobj.pagerrangestring = ' von ';
    localizationobj.pagernextbuttonstring = 'voriger';
    localizationobj.pagerpreviousbuttonstring = 'nächster';
    localizationobj.sortascendingstring = 'Sortiere aufsteigend';
    localizationobj.sortdescendingstring = 'Sortiere absteigend';
    localizationobj.sortremovestring = 'Entferne Sortierung';
    localizationobj.firstDay = 1;
    localizationobj.percentsymbol = '%';
    localizationobj.currencysymbol = '€';
    localizationobj.currencysymbolposition = 'before';
    localizationobj.decimalseparator = '.';
    localizationobj.thousandsseparator = ',';
    localizationobj.days = {
      // full day names
      names: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag'
      ],
      // abbreviated day names
      namesAbbr: ['Sonn', 'Mon', 'Dien', 'Mitt', 'Donn', 'Fre', 'Sams'],
      // shortest day names
      namesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    };
    localizationobj.months = {
      // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
      names: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
        ''
      ],
      // abbreviated month names
      namesAbbr: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dez',
        ''
      ]
    };

    this.localization = localizationobj;
  }

  getEntityByRowIndex(selectedRowIndex: number): any {
    const rowdata = this.widgetGrid.getrowdata(selectedRowIndex);
    const selected: any = this.bpps.filter(function(el) {
      return el.id === rowdata.id;
    })[0];

    return selected;
  }

  gridOnCellbeginEdit(event: any): void {
    this.selectedRowIndexChanged = true;
  }

  gridOnCellEndEdit(event: any): void {
    console.log('gridOnCellEndEdit', event);

    // Manuel compare value for update
    if (this.lastCellName === event.args.datafield) {
      const entity = this.getEntityByRowIndex(event.args.rowindex);

      if (entity[event.args.datafield] !== event.args.value) {
        // entity[event.args.datafield] = event.args.value;

        const entityMerged: any = {
          ...entity,
          ...this.widgetGrid.getrowdata(event.args.rowindex)
        };
        entityMerged[event.args.datafield] = event.args.value;
        this.saveData(entityMerged);
      }
    }
  }

  gridOnCellvaluechanged(event: any): void {
    this.selectedRowIndexChanged = true;
  }

  gridOnCellSelect(event: any): void {
    // Handle Grid changes
    if (
      this.selectedRowIndex !== event.args.rowindex &&
      this.selectedRowIndexChanged
    ) {
      console.log('saving data for row:', this.selectedRowIndex);
      this.saveGridData(this.widgetGrid.getrowdata(this.selectedRowIndex));
    }

    this.selectedRowIndex = event.args.rowindex;
    this.gridRowsCount = this.widgetGrid.getrows().length;
    this.lastCellSelected = event.args.datafield === this.lastCellName;

    if (this.selectedRowIndex === this.gridRowsCount - 1) {
      this.lastRowSelected = true;
    } else {
      this.lastRowSelected = false;
    }

    if (this.lastCellSelected && this.lastRowSelected) {
      this.allowNewGridRow = true;
    } else {
      this.allowNewGridRow = false;
    }
  }

  handleKeyboardNavigation = (event: any): boolean => {
    // Ugly Hack because handleKeyboardNavigation is called twice
    // https://www.jqwidgets.com/community/topic/handlekeyboardnavigation-event-is-called-twice-when-keypressed/
    if (event.timeStamp === this.keyboardHandleTimestamp) {
      return false;
    }
    this.keyboardHandleTimestamp = event.timeStamp;

    const key = event.charCode
      ? event.charCode
      : event.keyCode ? event.keyCode : 0;

    // Handle new data rows on tab
    if (
      (key === 9 && this.allowNewGridRow) ||
      (key === 40 && this.lastRowSelected && !this.selectedRowIndexIsNew)
    ) {
      this.addNewRow();
    } else if (key === 13) {
      console.log('enter - edit', this.selectedRowIndex);
      return true;
    } else if (key === 27 && this.selectedRowIndexIsNew) {
      this.removeUnsavedRow();
    } else if (key === 46) {
      if (confirm('Wollen Sie den Datensatz wirklich löschen?')) {
        this.deleteGridData(this.selectedRowIndex);
      }
    }

    return false;
    // tslint:disable-next-line:semicolon
  };

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

  deleteGridData(selectedRowIndex: any) {
    const rowdata = this.widgetGrid.getrowdata(selectedRowIndex);

    const selected: any = this.bpps.filter(function(el) {
      return el.id === rowdata.id;
    })[0];

    this.deleteData(selected);
    this.selectedRowIndexChanged = false;
    this.setGridCellFocus(0);
  }

  setGridCellFocus(selectedRowIndex?: number): void {
    if (selectedRowIndex == null) {
      selectedRowIndex = +this.widgetGrid.getdatainformation().rowscount;
      selectedRowIndex--;
    }
    this.widgetGrid.clearselection();
    this.widgetGrid.selectcell(selectedRowIndex, this.firstCellName);
  }

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
    this.widgetGrid.addrow(null, entity);

    this.allowNewGridRow = false;
    this.selectedRowIndexChanged = false;
    this.selectedRowIndexIsNew = true;
    this.bindGridData(this.bpps);

    this.setGridCellFocus(this.selectedRowIndex + 1);
  }

  removeUnsavedRow(): void {
    const rowscount = this.widgetGrid.getdatainformation().rowscount;
    if (
      this.selectedRowIndex >= 0 &&
      this.selectedRowIndex < parseFloat(rowscount)
    ) {
      const id = this.widgetGrid.getrowid(this.selectedRowIndex);
      this.widgetGrid.deleterow(id);
    }
    this.selectedRowIndexIsNew = false;
    this.selectedRowIndexChanged = false;
    this.bpps = this.bpps.filter(e => e.id !== 0);
    this.bindGridData(this.bpps);
    this.setGridCellFocus();
  }
}
