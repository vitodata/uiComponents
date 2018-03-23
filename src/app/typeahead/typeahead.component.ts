import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html'
})
export class TypeaheadComponent implements OnInit {
  comment: string;
  list: any[] = ['Aargau', 'Bern', 'Luzern', 'Zug', 'Zürich'];

  person: any[] = [
    {
      id: 2185,
      name: {
        family: 'Meyer',
        given: 'Andreas',
        title: null,
        salutation: 'Herr'
      },
      address: {
        line: 'Zürcherstrasse 3',
        lineAdditional: null,
        city: 'Henggart',
        state: 'ZH',
        postalCode: '8444',
        country: 'CH '
      },
      birthDate: '1937-07-03T00:00:00Z',
      deceasedDate: null,
      age: { years: 80, months: 8 },
      healthInsuranceType: null,
      gender: 'Male',
      updateDate: null
    },
    {
      id: 1346,
      name: {
        family: 'Meyer',
        given: 'Hans-Rudolf',
        title: null,
        salutation: 'Herr'
      },
      address: {
        line: 'Fuchsweg 91',
        lineAdditional: null,
        city: 'Zürich',
        state: 'ZH',
        postalCode: '8021',
        country: 'CH '
      },
      birthDate: '2010-08-08T00:00:00Z',
      deceasedDate: null,
      age: { years: 7, months: 7 },
      healthInsuranceType: null,
      gender: 'Male',
      updateDate: '2016-11-04T06:45:13Z'
    },
    {
      id: 708,
      name: {
        family: 'Meyer',
        given: 'Ingrid',
        title: null,
        salutation: 'Frau'
      },
      address: {
        line: 'Musterweg 12',
        lineAdditional: null,
        city: 'Winterthur',
        state: 'ZH',
        postalCode: '8406',
        country: 'CH '
      },
      birthDate: '1976-05-05T00:00:00Z',
      deceasedDate: null,
      age: { years: 41, months: 10 },
      healthInsuranceType: null,
      gender: 'Female',
      updateDate: '2016-11-04T06:46:59Z'
    },
    {
      id: 1721,
      name: {
        family: 'Meyer',
        given: 'Joelle',
        title: null,
        salutation: 'Frau'
      },
      address: {
        line: 'Buchrain 5',
        lineAdditional: null,
        city: 'Zürich',
        state: 'ZH',
        postalCode: '8050',
        country: 'CH '
      },
      birthDate: '1997-02-02T00:00:00Z',
      deceasedDate: null,
      age: { years: 21, months: 1 },
      healthInsuranceType: null,
      gender: 'Female',
      updateDate: '2016-01-12T15:38:35Z'
    },
    {
      id: 2056,
      name: { family: 'Meyer', given: 'Karl', title: null, salutation: 'Herr' },
      address: {
        line: 'Friedhofweg 333',
        lineAdditional: null,
        city: 'Pfungen',
        state: 'ZH',
        postalCode: '8422',
        country: 'CH '
      },
      birthDate: '1952-12-12T00:00:00Z',
      deceasedDate: null,
      age: { years: 65, months: 3 },
      healthInsuranceType: 'CareMed',
      gender: 'Male',
      updateDate: '2016-11-18T08:59:22Z'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
