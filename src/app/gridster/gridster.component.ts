import { Component, OnInit } from '@angular/core';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss']
})
export class GridsterComponent implements OnInit {
  editMode = false;

  options: GridsterConfig = {
    gridType: 'fixed', // fixed' will set the rows and columns dimensions based on fixedColWidth and fixedRowHeight options
    fixedColWidth: 105,
    fixedRowHeight: 105,
    outerMargin: true,
    margin: 10,
    mobileBreakpoint: 600,
    pushResizeItems: true,
    defaultItemCols: 1, // default width of an item in columns
    defaultItemRows: 1, // default height of an item in rows
    minCols: 1,
    maxCols: 16,
    minRows: 1,
    maxRows: 16,
    maxItemCols: 16,
    minItemCols: 2,
    maxItemRows: 16,
    minItemRows: 2,
    resizable: {
      enabled: false
    },
    draggable: {
      enabled: false
    }
  };

  widgets: any[] = [
    {
      name: 'test 1',
      x: 0,
      y: 0,
      cols: 3,
      rows: 2
    },
    {
      name: 'test 2',
      x: 4,
      y: 0,
      cols: 2,
      rows: 2
    },
    {
      name: 'test 3',
      x: 0,
      y: 2,
      cols: 5,
      rows: 2
    },
    {
      name: 'test 4',
      x: 3,
      y: 2,
      cols: 3,
      rows: 2
    },
    {
      name: 'test 5',
      x: 2,
      y: 4,
      cols: 2,
      rows: 3
    }
  ];

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.options.resizable.enabled = this.editMode;
    this.options.draggable.enabled = this.editMode;
    this.options.api.optionsChanged();
  }

  constructor() {}

  ngOnInit() {}
}
