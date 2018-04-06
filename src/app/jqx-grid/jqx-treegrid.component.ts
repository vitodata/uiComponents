import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';

@Component({
  templateUrl: 'jqx-treegrid.component.html'
})
export class JqxTreeGridComponent {
  @ViewChild('widgetGrid') widgetGrid: jqxTreeGridComponent;

  newRowID = null;
  theme: string = '';
  buttonsObject: any = null;

  employees: any[] = [
    {
      EmployeeID: 1,
      FirstName: 'Nancy',
      LastName: 'Davolio',
      ReportsTo: 2,
      Country: 'USA',
      Title: 'Sales Representative',
      HireDate: '1992-05-01 00:00:00',
      BirthDate: '1948-12-08 00:00:00',
      City: 'Seattle',
      Address: '507 - 20th Ave. E.Apt. 2A'
    },
    {
      EmployeeID: 2,
      FirstName: 'Andrew',
      LastName: 'Fuller',
      ReportsTo: null,
      Country: 'USA',
      Title: 'Vice President, Sales',
      HireDate: '1992-08-14 00:00:00',
      BirthDate: '1952-02-19 00:00:00',
      City: 'Tacoma',
      Address: '908 W. Capital Way'
    },
    {
      EmployeeID: 3,
      FirstName: 'Janet',
      LastName: 'Leverling',
      ReportsTo: 2,
      Country: 'USA',
      Title: 'Sales Representative',
      HireDate: '1992-04-01 00:00:00',
      BirthDate: '1963-08-30 00:00:00',
      City: 'Kirkland',
      Address: '722 Moss Bay Blvd.'
    },
    {
      EmployeeID: 4,
      FirstName: 'Margaret',
      LastName: 'Peacock',
      ReportsTo: 2,
      Country: 'USA',
      Title: 'Sales Representative',
      HireDate: '1993-05-03 00:00:00',
      BirthDate: '1937-09-19 00:00:00',
      City: 'Redmond',
      Address: '4110 Old Redmond Rd.'
    },
    {
      EmployeeID: 5,
      FirstName: 'Steven',
      LastName: 'Buchanan',
      ReportsTo: 2,
      Country: 'UK',
      Title: 'Sales Manager',
      HireDate: '1993-10-17 00:00:00',
      BirthDate: '1955-03-04 00:00:00',
      City: 'London',
      Address: '14 Garrett Hill'
    },
    {
      EmployeeID: 6,
      FirstName: 'Michael',
      LastName: 'Suyama',
      ReportsTo: 5,
      Country: 'UK',
      Title: 'Sales Representative',
      HireDate: '1993-10-17 00:00:00',
      BirthDate: '1963-07-02 00:00:00',
      City: 'London',
      Address: 'Coventry House Miner Rd.'
    },
    {
      EmployeeID: 7,
      FirstName: 'Robert',
      LastName: 'King',
      ReportsTo: 5,
      Country: 'UK',
      Title: 'Sales Representative',
      HireDate: '1994-01-02 00:00:00',
      BirthDate: '1960-05-29 00:00:00',
      City: 'London',
      Address: 'Edgeham Hollow Winchester Way'
    },
    {
      EmployeeID: 8,
      FirstName: 'Laura',
      LastName: 'Callahan',
      ReportsTo: 2,
      Country: 'USA',
      Title: 'Inside Sales Coordinator',
      HireDate: '1994-03-05 00:00:00',
      BirthDate: '1958-01-09 00:00:00',
      City: 'Seattle',
      Address: '4726 - 11th Ave. N.E.'
    },
    {
      EmployeeID: 9,
      FirstName: 'Anne',
      LastName: 'Dodsworth',
      ReportsTo: 5,
      Country: 'UK',
      Title: 'Sales Representative',
      HireDate: '1994-11-15 00:00:00',
      BirthDate: '1966-01-27 00:00:00',
      City: 'London',
      Address: '7 Houndstooth Rd.'
    }
  ];

  source: any = {
    dataType: 'json',
    dataFields: [
      { name: 'EmployeeID', type: 'number' },
      { name: 'ReportsTo', type: 'number' },
      { name: 'FirstName', type: 'string' },
      { name: 'LastName', type: 'string' },
      { name: 'Country', type: 'string' },
      { name: 'City', type: 'string' },
      { name: 'Address', type: 'string' },
      { name: 'Title', type: 'string' },
      { name: 'HireDate', type: 'date' },
      { name: 'BirthDate', type: 'date' }
    ],
    hierarchy: {
      keyDataField: { name: 'EmployeeID' },
      parentDataField: { name: 'ReportsTo' }
    },
    id: 'EmployeeID',
    localData: this.employees,
    addRow: (rowID, rowData, position, parentID, commit) => {
      // synchronize with the server - send insert command
      // call commit with parameter true if the synchronization with the server is successful
      // and with parameter false if the synchronization failed.
      // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
      this.newRowID = rowID;
      commit(true);
    },
    updateRow: (rowID, rowData, commit) => {
      // synchronize with the server - send update command
      // call commit with parameter true if the synchronization with the server is successful
      // and with parameter false if the synchronization failed.
      commit(true);
    },
    deleteRow: (rowID, commit) => {
      // synchronize with the server - send delete command
      // call commit with parameter true if the synchronization with the server is successful
      // and with parameter false if the synchronization failed.
      commit(true);
    }
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    {
      text: 'FirstName',
      // columnGroup: 'Name',
      dataField: 'FirstName',
      width: 200
    },
    {
      text: 'LastName',
      // columnGroup: 'Name',
      dataField: 'LastName',
      width: 200
    },
    { text: 'Title', dataField: 'Title', width: 160 },
    {
      text: 'Birth Date',
      dataField: 'BirthDate',
      cellsFormat: 'd',
      width: 120
    },
    { text: 'Hire Date', dataField: 'HireDate', cellsFormat: 'd', width: 120 },
    { text: 'Address', dataField: 'Address', width: 250 },
    { text: 'City', dataField: 'City', width: 120 },
    { text: 'Country', dataField: 'Country' }
  ];

  // columnGroups: any[] = [{ text: 'Name', name: 'Name' }];

  // ready(): void {
  //   this.widgetGrid.expandRow(2);
  // }

  rendered = (type: any): void => {
    // Initialize the DragDrop plug-in. Set it's drop target to the second Grid.
    let options = {
      revert: true,
      dragZIndex: 99999,
      appendTo: 'body',
      dropAction: 'none',
      dropTarget: '.drop-target',
      // restricter: { left: 30, top: 250, width: 30, height: 310 },
      initFeedback: (feedback: any): void => {
        feedback.height(25);
        feedback.width(400);
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
          flattenGridDragDropCells[i].revert = false;
        }
      );

      // Enable revert when the dragged cell is outside the second Grid.
      flattenGridDragDropCells[i].addEventHandler(
        'dropTargetLeave',
        (): void => {
          console.log('dropTargetLeave', i);
          flattenGridDragDropCells[i].revert = true;
        }
      );

      // initialize the dragged object.
      flattenGridDragDropCells[i].addEventHandler(
        'dragStart',
        (event: any): void => {
          let value = event.target.innerHTML;
          let position = jqx.position(event.args);
          // let cell = this.widgetGrid.getcellatposition(
          //   position.left,
          //   position.top
          // );
          // console.log('flattenGridDragDropCells:dragStart', cell);
          // this.sortStartRowNo = this.getEntityByRowIndex(cell.row).rowNo;
          // console.log('sortStartRowNo', this.sortStartRowNo);
          flattenGridDragDropCells[i].data = { value: value };
        }
      );

      // Set the new cell value when the dragged cell is dropped over the second Grid.
      flattenGridDragDropCells[i].addEventHandler(
        'dragEnd',
        (event: any): void => {
          let value = event.target.innerHTML;
          value = value.slice(0, 37) + value.slice(62);
          let position = jqx.position(event.args);
          console.log('dragEnd', event);
          // let cell = this.widgetGrid.getcellatposition(
          //   position.left,
          //   position.top
          // );
          // console.log('flattenGridDragDropCells-dragEnd:cell', cell);
          // if (typeof cell !== 'boolean') {
          //   console.log('dragEnd', event);
          //   // this.reOrderGridData(this.getEntityByRowIndex(cell.row).rowNo);
          //   // this.widgetGrid.setcellvalue(
          //   //   cell.row,
          //   //   cell.column.toString(),
          //   //   value
          //   // );
          // }
        }
      );
    }
  };
}
