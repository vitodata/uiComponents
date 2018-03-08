import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html'
})
export class TypeaheadComponent implements OnInit {
  comment: string;
  list: any[] = ['Aargau', 'Bern', 'Luzern', 'Zug', 'Zürich'];

  constructor() {}

  ngOnInit() {}
}
