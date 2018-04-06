import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxDragDropComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdragdrop';
import { jqxSortableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxsortable';
import { SortItem } from '../models/sortItem';

declare var $;

@Component({
  templateUrl: 'jqx-grid-drag-drop.component.html',
  styleUrls: ['jqx-grid-drag-drop.component.css']
})
export class JqxGridDragDropComponent implements OnInit {
  @ViewChild('widgetGrid') widgetGrid: jqxGridComponent;
  // @ViewChild('jqxgrid-editor') jqxgridEditor: jqxGridComponent;
  // @ViewChild('mySortable') mySortable: jqxSortableComponent;
  bpps: any[];

  source: any;
  columns: any[];
  dataAdapter: any;
  localization: any;

  eventTimeStamp: any;

  // Sorting stuff
  sortStartRowNo: number;
  sortList: SortItem[] = [];

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
        effectiveDateTime: '2018-01-01T15:35:59.467Z',
        rowVersion: 'AAAAAAABw2o='
      },
      {
        id: 140,
        patientId: 1,
        careProviderId: 'HM',
        rowNo: 2,
        systolic: 25,
        diastolic: 125,
        pulse: 90,
        pulseQuality: 'Undefined',
        bodySite: 'RightArm',
        bloodPressureMeasurementPosition: 'Standing',
        comment: 'ok',
        effectiveDateTime: '2018-02-01T15:40:28.363Z',
        rowVersion: 'AAAAAAAAR8c='
      },
      {
        id: 143,
        patientId: 1,
        careProviderId: 'MED',
        rowNo: 1,
        systolic: 3,
        diastolic: 2,
        pulse: 0,
        pulseQuality: 'Undefined',
        bodySite: 'RightArm',
        bloodPressureMeasurementPosition: 'Horizontal',
        comment: 'sdf',
        effectiveDateTime: '2018-03-01T16:08:12Z',
        rowVersion: 'AAAAAAABw3w='
      }
    ];
    this.bindGridData(
      this.bpps.sort((a, b) => {
        return a.rowNo < b.rowNo ? -1 : a.rowNo > b.rowNo ? 1 : 0;
      })
    );

    // this.loadInfo();
  }

  // loadInfo(): void {
  //   let firstNames = ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven'];
  //   let lastNames = ['Davolio', 'Fuller', 'Leverling', 'Peacock', 'Buchanan'];
  //   let titles = [
  //     'Sales Representative',
  //     'Vice President, Sales',
  //     'Sales Representative',
  //     'Sales Representative',
  //     'Sales Manager'
  //   ];
  //   for (let i = 0; i < firstNames.length; i++) {
  //     let element = document.createElement('div');
  //     // let imgurl = '../images/' + firstNames[i].toLowerCase() + '.png';
  //     // let img = '<img height="50" width="40" src="' + imgurl + '"/>';
  //     element.innerHTML =
  //       '<table style="min-width: 130px;"><tr><td style="width: 40px;" rowspan="2">' +
  //       // img +
  //       '</td><td>' +
  //       firstNames[i] +
  //       ' ' +
  //       lastNames[i] +
  //       '</td></tr><tr><td>' +
  //       titles[i] +
  //       '</td></tr></table>';
  //     this.mySortable.elementRef.nativeElement.firstElementChild.appendChild(
  //       element
  //     );
  //   }
  // }

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
        { name: 'rowNo', type: 'number' },
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
      // sortcolumn: 'rowNo',
      // sortdirection: 'asc'
    };

    // var columnrenderer = function (value) {
    //   return '<div class="grids-popover" style="text-align: center; margin-top: 5px;">' + value + '</div>';

    this.columns = [
      // {
      //   text: 'Datum',
      //   datafield: 'datetimeinput',
      //   width: '110',
      //   cellsformat: 'dd.MM.yyyy',
      //   validation: this.validateFunc,
      //   cellsrenderer: function(
      //     row,
      //     columnfield,
      //     value,
      //     defaulthtml,
      //     columnproperties
      //   ) {
      //     return (
      //       '<div class="grids-popover" style="text-align: center; margin-top: 5px;">' +
      //       value +
      //       '</div>'
      //     );
      //   }
      // },
      {
        text: 'Datum',
        // columnsrenderer: function(value) {
        //   return (
        //     '<div class="grids-popover" style="text-align: center; margin-top: 5px;">' +
        //     value +
        //     '</div>'
        //   );
        // },
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
      },
      {
        text: 'RowNo (internal)',
        columntype: 'textbox',
        datafield: 'rowNo',
        width: 150
      }
      // {
      //   text: 'Patient',
      //   datafield: 'patientId',
      //   width: 150,
      //   columntype: 'template',
      //   createeditor: function(
      //     row,
      //     cellvalue,
      //     editor,
      //     celltext,
      //     cellwidth,
      //     cellheight
      //   ) {
      //     editor.append(
      //       '<div style="border-color: transparent;" id="jqxtree-editor"></div>'
      //     );
      //     editor.jqxDropDownButton({ width: 150, height: 25 });

      //     const treedata = [
      //       {
      //         id: '2',
      //         parentid: '1',
      //         text: 'Hot Chocolate',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '3',
      //         parentid: '1',
      //         text: 'Peppermint Hot Chocolate',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '4',
      //         parentid: '1',
      //         text: 'Salted Caramel Hot Chocolate',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '5',
      //         parentid: '1',
      //         text: 'White Hot Chocolate',
      //         value: '$2.3'
      //       },
      //       {
      //         text: 'Chocolate Beverage',
      //         id: '1',
      //         parentid: '-1',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '6',
      //         text: 'Espresso Beverage',
      //         parentid: '-1',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '7',
      //         parentid: '6',
      //         text: 'Caffe Americano',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '8',
      //         text: 'Caffe Latte',
      //         parentid: '6',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '9',
      //         text: 'Caffe Mocha',
      //         parentid: '6',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '10',
      //         text: 'Cappuccino',
      //         parentid: '6',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '11',
      //         text: 'Pumpkin Spice Latte',
      //         parentid: '6',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '12',
      //         text: 'Frappuccino',
      //         parentid: '-1'
      //       },
      //       {
      //         id: '13',
      //         text: 'Caffe Vanilla Frappuccino',
      //         parentid: '12',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '15',
      //         text: '450 calories',
      //         parentid: '13',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '16',
      //         text: '16g fat',
      //         parentid: '13',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '17',
      //         text: '13g protein',
      //         parentid: '13',
      //         value: '$2.3'
      //       },
      //       {
      //         id: '14',
      //         text: 'Caffe Vanilla Frappuccino Light',
      //         parentid: '12',
      //         value: '$2.3'
      //       }
      //     ];

      //     const source = {
      //       datatype: 'json',
      //       datafields: [
      //         { name: 'id' },
      //         { name: 'parentid' },
      //         { name: 'text' },
      //         { name: 'value' }
      //       ],
      //       id: 'id',
      //       localdata: treedata
      //     };

      //     const dataAdapter = new jqx.dataAdapter(source, { autoBind: true });
      //     const records: any = dataAdapter.getRecordsHierarchy(
      //       'id',
      //       'parentid',
      //       'items',
      //       [{ name: 'text', map: 'label' }]
      //     );

      //     // Create jqxTree
      //     $('#jqxtree-editor').jqxTree({
      //       allowDrag: true,
      //       allowDrop: true,
      //       height: '300px',
      //       width: '220px',
      //       source: records
      //       // dragStart: function(item) {
      //       //   if (item.label === 'Community') {
      //       //     return false;
      //       //   }
      //       // }
      //     });

      //     // // initialize jqxGrid
      //     // $('#jqxgrid-editor').jqxGrid({
      //     //   width: 550,
      //     //   source: dataAdapter,
      //     //   pageable: true,
      //     //   autoheight: true,
      //     //   columnsresize: true,
      //     //   columns: [
      //     //     {
      //     //       text: 'First Name',
      //     //       columntype: 'textbox',
      //     //       datafield: 'firstname',
      //     //       width: 90
      //     //     },
      //     //     {
      //     //       text: 'Last Name',
      //     //       datafield: 'lastname',
      //     //       columntype: 'textbox',
      //     //       width: 90
      //     //     },
      //     //     {
      //     //       text: 'Product',
      //     //       columntype: 'dropdownlist',
      //     //       datafield: 'productname',
      //     //       width: 180
      //     //     },
      //     //     {
      //     //       text: 'Quantity',
      //     //       datafield: 'quantity',
      //     //       width: 70,
      //     //       cellsalign: 'right'
      //     //     },
      //     //     {
      //     //       text: 'Price',
      //     //       datafield: 'price',
      //     //       cellsalign: 'right',
      //     //       cellsformat: 'c2'
      //     //     }
      //     //   ]
      //     // });

      //     // $('#jqxgrid-editor').on('rowselect', function(event) {
      //     //   const args = event.args;
      //     //   const row = $('#jqxgrid-editor').jqxGrid(
      //     //     'getrowdata',
      //     //     args.rowindex
      //     //   );
      //     //   const dropDownContent =
      //     //     '<div style="position: relative; margin-left: 3px; margin-top: 5px;">' +
      //     //     row['firstname'] +
      //     //     ' ' +
      //     //     row['lastname'] +
      //     //     '</div>';
      //     //   const name = row.firstname + ' ' + row.lastname;
      //     //   editor.jqxDropDownButton('setContent', dropDownContent);
      //     //   editor.css('display', 'none');
      //     // });

      //     // $('#jqxgrid-editor').jqxGrid('selectrow', 0);
      //   },
      //   geteditorvalue: function(row, cellvalue, editor) {
      //     // return the editor's value.
      //     editor.jqxDropDownButton('close');
      //     return name;
      //   }
      // }
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

  sortGridData(): void {
    this.widgetGrid.sortby('rowNo', 'asc');
  }
  getEntityByRowIndex(selectedRowIndex: number): any {
    const rowdata = this.widgetGrid.getrowdata(selectedRowIndex);
    const selected: any = this.bpps.filter(function(el) {
      return el.id === rowdata.id;
    })[0];

    return selected;
  }

  getEntityById(id: number): any {
    const selected: any = this.bpps.filter(function(el) {
      return el.id === id;
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
      selectedRowIndex = this.widgetGrid.getdatainformation().rowscount;
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

  rendered = (type: any): void => {
    // Initialize the DragDrop plug-in. Set it's drop target to the second Grid.
    let options = {
      revert: true,
      dragZIndex: 99999,
      appendTo: 'body',
      dropAction: 'none',
      // dropTarget: '.grids-popover',
      // restricter: { left: 30, top: 250, width: 30, height: 310 },
      initFeedback: (feedback: any): void => {
        feedback.height(25);
        feedback.width(1000);
        feedback.css('background', '#aaa');
      }
    };

    let uglyGridDragDropCells = jqwidgets.createInstance(
      '.jqx-grid-cell',
      'jqxDragDrop',
      options
    );
    let flattenGridDragDropCells = flatten(uglyGridDragDropCells);

    function flatten(arr: any[]): any[] {
      return arr.reduce((flat: any[], toFlatten: any[]): any[] => {
        return flat.concat(
          Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
      }, []);
    }

    // Add Event Handlers
    for (let i = 0; i < flattenGridDragDropCells.length; i++) {
      // Disable revert when the dragged cell is over the second Grid.
      flattenGridDragDropCells[i].addEventHandler(
        'dropTargetEnter',
        (): void => {
          console.log('dropTargetEnter', i);
          flattenGridDragDropCells[i].revert = true;
        }
      );

      // Enable revert when the dragged cell is outside the second Grid.
      flattenGridDragDropCells[i].addEventHandler(
        'dropTargetLeave',
        (): void => {
          console.log('dropTargetLeave', i);
          flattenGridDragDropCells[i].revert = false;
        }
      );

      // initialize the dragged object.
      flattenGridDragDropCells[i].addEventHandler(
        'dragStart',
        (event: any): void => {
          let value = event.target.innerHTML;
          let position = jqx.position(event.args);
          let cell = this.widgetGrid.getcellatposition(
            position.left,
            position.top
          );
          // console.log('flattenGridDragDropCells:dragStart', cell);
          this.sortStartRowNo = this.getEntityByRowIndex(cell.row).rowNo;
          console.log('sortStartRowNo', this.sortStartRowNo);
          flattenGridDragDropCells[i].data = { value: value };
        }
      );

      // Set the new cell value when the dragged cell is dropped over the second Grid.
      flattenGridDragDropCells[i].addEventHandler(
        'dragEnd',
        (event: any): void => {
          if (this.eventTimeStamp === event.timeStamp) {
            return;
          }
          this.eventTimeStamp = event.timeStamp;

          let value = event.target.innerHTML;
          value = value.slice(0, 37) + value.slice(62);
          let position = jqx.position(event.args);
          let cell = this.widgetGrid.getcellatposition(
            position.left,
            position.top
          );
          if (typeof cell !== 'boolean') {
            console.log('dragEnd', event);
            this.reOrderGridData(this.getEntityByRowIndex(cell.row).rowNo);
          }
        }
      );
    }
  };

  reOrderGridData(dropRowNo: number): void {
    let idx = 0;
    let newRow = 0;
    this.sortList = [];
    console.log('reOrderGridData:dropRowNo', dropRowNo);

    if (this.sortStartRowNo > dropRowNo) {
      idx = 0;
      this.widgetGrid
        .getrows()
        .sort((a, b) => {
          return a.rowNo < b.rowNo ? -1 : a.rowNo > b.rowNo ? 1 : 0;
        })
        .forEach(i => {
          if (idx >= dropRowNo) {
            if (idx === this.sortStartRowNo) {
              this.sortList.push({
                id: i.id,
                rowNo: i.rowNo,
                rowNew: dropRowNo
              });
            } else {
              newRow++;
              this.sortList.push({ id: i.id, rowNo: i.rowNo, rowNew: newRow });
            }
          }
          idx++;
        });
    } else {
      idx = 2;
      newRow = 2;
      this.widgetGrid
        .getrows()
        .sort((a, b) => {
          return a.rowNo > b.rowNo ? -1 : a.rowNo < b.rowNo ? 1 : 0;
        })
        .forEach(i => {
          if (idx <= dropRowNo) {
            if (idx === this.sortStartRowNo) {
              this.sortList.push({
                id: i.id,
                rowNo: i.rowNo,
                rowNew: dropRowNo
              });
            } else {
              newRow--;
              this.sortList.push({ id: i.id, rowNo: i.rowNo, rowNew: newRow });
            }
          }
          idx--;
        });
    }

    let gridRow = 0;
    this.sortList.forEach(i => {
      const row = this.widgetGrid.getrowdata(gridRow);

      this.bpps.filter(e => e.id === row.id)[0].rowNo = this.sortList.filter(
        e => e.id === row.id
      )[0].rowNew;
      console.log('entity', this.bpps.filter(e => e.id === row.id)[0]);
      gridRow++;
      console.log('this.sortList', i);
    });

    this.bindGridData(
      this.bpps.sort((a, b) => {
        return a.rowNo < b.rowNo ? -1 : a.rowNo > b.rowNo ? 1 : 0;
      })
    );
  }
}
