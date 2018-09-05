import { Component } from '@angular/core';

// x/y-axes min/max values, disable xAxes Line, Legend and Tooltip Color -> http://jsfiddle.net/h9oyxqbk/

@Component({
  selector: 'line-chart-demo',
  templateUrl: './ng2-charts.component.html'
})
export class LineChartDemoComponent {
  // lineChart
  public lineChartData: Array<any> = [
    { data: [4.9, 5.1, 5.9, 6.5, 5.5, 5.2, 4.5], label: 'Glukose' }
  ];
  public lineChartLabels: Array<any> = [
    ['Heute', '14:13'],
    ['01.03', '15:52'],
    ['01.03', '09:13'],
    ['13.02', '14:27'],
    ['02.02', '11:36'],
    ['28.01', '15:03'],
    ['15.01', '15:03']
  ];
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        gridLines: {
          color: '#DADADA'
        },
        // Disable Min/Max Values
        ticks: {
          min: 4,
          max: 7,
          step: 1,
        },
      }],
    },
    tooltips: {
      displayColors: false,

    },
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      radius: 5,
      pointHoverRadius: 5,
      backgroundColor: 'transparent',
      borderColor: '#c6c6c6',
      borderWidth: 2,
      pointBackgroundColor: ['#6A7D39', '#C85112', '#A9261E', '#A9261E', '#C85112', '#C85112', '#6A7D39'],
      pointBorderColor: '#f6f6f6',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {
        data: new Array(this.lineChartData[i].data.length),
        label: this.lineChartData[i].label
      };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor(Math.random() * 100 + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
