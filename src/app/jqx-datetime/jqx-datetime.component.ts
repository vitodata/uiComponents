import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'jqx-datetime.component.html'
})
export class JqxDatetimeComponent implements OnInit {
  bsValue = new Date();

  constructor() {}

  ngOnInit() {}
}
