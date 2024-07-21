import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
// import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css',
})
export class WorkoutChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  // chartOptions: Highcharts.Options;

  constructor() {
    // this.chartOptions = {
    //   chart: {
    //     type: 'bar',
    //   },
    //   title: {
    //     text: 'Workout Minutes by Type',
    //   },
    //   xAxis: {
    //     categories: ['Cardio', 'Strength', 'Yoga', 'Pilates'], // Example categories
    //     title: {
    //       text: 'Workout Types',
    //     },
    //   },
    //   yAxis: {
    //     title: {
    //       text: 'Minutes of Workout',
    //     },
    //     min: 0,
    //   },
    //   series: [
    //     // {
    //     //   name: 'Workout Minutes',
    //     //   data: [30, 45, 20, 35], // Example data
    //     // },
    //   ],
    // };
    // HC_exporting(Highcharts);
  }
}
