import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

import { WysiwygComponent } from './wysiwyg/wysiwyg.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
import { GridsterComponent } from './gridster/gridster.component';
import { GridsterModule } from 'angular-gridster2';
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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectComponent } from './ngx-mat-select-search/ngx-mat-select-search.component';

const quill: any = Quill; // this one is important, otherwise 'Quill' is undefined
const Parchment = quill.import('parchment'); // override p with div tag
const Block = Parchment.query('block');
Block.tagName = 'DIV';
quill.register(Block, true);

const routes = [
  { path: 'grid', component: AgGridComponent },
  { path: 'typeahead', component: TypeaheadComponent },
  { path: 'wysiwyg', component: WysiwygComponent },
  { path: 'gridster', component: GridsterComponent },
  { path: 'ngx-mat-select-search', component: SelectComponent },
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
    GridsterModule,
    AgGridModule.withComponents([GridDatePickerComponent]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    // components from app
    AppComponent,
    AgGridComponent,
    GridDatePickerComponent,
    TypeaheadComponent,
    WysiwygComponent,
    GridsterComponent,
    SelectComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
