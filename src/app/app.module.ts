import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JqxGridComponent } from './jqx-grid/jqx-grid.component';
import { JqxTreeGridComponent } from './jqx-grid/jqx-treegrid.component';
import { JqxGridDragDropComponent } from './jqx-grid/jqx-grid-drag-drop.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxDropDownButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxDragDropComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdragdrop';
import { jqxDropDownListComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxTreeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtree';
import { jqxTreeGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtreegrid';
import { jqxSortableComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxsortable';
import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { JqxDatetimeComponent } from './jqx-datetime/jqx-datetime.component';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
import { AgGridModule } from 'ag-grid-angular/main';
import 'ag-grid-enterprise';
import { GridDatePickerComponent } from './grid-components/grid-date-picker.component';
import {
  BsDropdownModule,
  ButtonsModule,
  DatepickerModule,
  BsDatepickerModule
} from 'ngx-bootstrap';
import { AgGridComponent } from './ag-grid/ag-grid.component';

const quill: any = Quill; // this one is important, otherwise 'Quill' is undefined
const Parchment = quill.import('parchment'); // override p with div tag
const Block = Parchment.query('block');
Block.tagName = 'DIV';
quill.register(Block, true);

const routes = [
  { path: 'grid', component: AgGridComponent },
  { path: 'griddragdrop', component: JqxGridDragDropComponent },
  { path: 'treegrid', component: JqxTreeGridComponent },
  { path: 'typeahead', component: TypeaheadComponent },
  { path: 'datetime', component: JqxDatetimeComponent },
  { path: 'wysiwyg', component: WysiwygComponent },
  { path: '', redirectTo: '/grid', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(routes),
    TypeaheadModule.forRoot(),
    QuillModule,
    AgGridModule.withComponents([GridDatePickerComponent])
  ],
  declarations: [
    // jQWidgets Components
    jqxGridComponent,
    jqxDropDownButtonComponent,
    jqxDateTimeInputComponent,
    jqxDragDropComponent,
    jqxDropDownListComponent,
    jqxSortableComponent,
    jqxTreeComponent,
    jqxTreeGridComponent,
    // components from app
    AppComponent,
    AgGridComponent,
    GridDatePickerComponent,
    JqxGridComponent,
    JqxTreeGridComponent,
    JqxGridDragDropComponent,
    TypeaheadComponent,
    JqxDatetimeComponent,
    WysiwygComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
