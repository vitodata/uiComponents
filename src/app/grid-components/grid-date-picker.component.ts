import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular/main';
import * as moment from 'moment';
@Component({
  selector: 'date-editor-cell',
  template: `
  <input type="text"
  class="form-control"
  #dp="bsDatepicker"
  bsDatepicker
  (bsValueChange)="onClick($event)"
  [bsValue]="foo"
  >
  `
})
export class GridDatePickerComponent implements ICellEditorAngularComp {
  private params: any;
  foo: Date;
  public selectedDate: Date = new Date();

  agInit(params: any): void {
    this.params = params;
    console.log('agInit', params);
    this.foo = moment(this.params.value).toDate();
  }

  getValue(): any {
    return this.selectedDate;
  }

  isPopup(): boolean {
    return true;
  }

  onClick(date: Date) {
    this.selectedDate = date;
    // this.params.api.stopEditing();
  }
}
