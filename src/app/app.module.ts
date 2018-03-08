import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JqxGridComponent } from './jqx-grid/jqx-grid.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { JqxDatetimeComponent } from './jqx-datetime/jqx-datetime.component';
import { WysiwygComponent } from './wysiwyg/wysiwyg.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { QuillModule } from 'ngx-quill';
import * as Quill from 'quill';
const quill: any = Quill; // this one is important, otherwise 'Quill' is undefined
const Parchment = quill.import('parchment'); // override p with div tag
const Block = Parchment.query('block');
Block.tagName = 'DIV';
quill.register(Block, true);

const routes = [
  { path: 'grid', component: JqxGridComponent },
  { path: 'typeahead', component: TypeaheadComponent },
  { path: 'datetime', component: JqxDatetimeComponent },
  { path: 'wysiwyg', component: WysiwygComponent },
  { path: '', redirectTo: '/grid', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TypeaheadModule.forRoot(),
    QuillModule
  ],
  declarations: [
    // jQWidgets Components
    jqxGridComponent,
    jqxDateTimeInputComponent,
    // components from app
    AppComponent,
    JqxGridComponent,
    TypeaheadComponent,
    JqxDatetimeComponent,
    WysiwygComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
