import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { Workout } from '../../../../core/models/workout.model';
import { User } from '../../../../core/models/user.model';
import { userData } from '../../data/userData';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrl: './workout-chart.component.css',
})
export class WorkoutChartComponent implements OnInit {
  initialUserData: User[] = userData;
  userList: User[] = [];
  selectedUser: string = '';
  Highcharts: typeof Highcharts = Highcharts;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    let workoutListLocal =
      this.localStorageService.getParsedValue('workout_list');

    // use mocked data when localstroage is empty
    if (workoutListLocal?.length) {
      this.userList = this.convertWorkoutsToUsers(workoutListLocal);
    } else {
      this.userList = this.initialUserData;
    }
    // Select first user
    this.selectedUser = this.userList[0].name!;
    this.loadChart(this.userList[0]);
  }

  handleUserChange(user: User) {
    this.loadChart(user);
  }

  convertWorkoutsToUsers(workouts: Workout[]): User[] {
    const userMap: { [key: string]: User } = {};
    workouts.map((workout) => {
      const userName = workout.user || 'Unknown';
      if (!userMap[userName]) {
        userMap[userName] = {
          id: Object.keys(userMap).length + 1,
          name: userName,
          totalWorkoutMinutes: 0,
          workouts: [],
        };
      }
      userMap[userName].workouts.push(workout);
      userMap[userName].totalWorkoutMinutes =
        userMap[userName].totalWorkoutMinutes! + workout.minutes!;
    });

    return Object.values(userMap);
  }

  loadChart(data: User) {
    let seriesData: (string | number)[][] = data.workouts?.map((u) => {
      return [u.type!, u.minutes!];
    });
    let chartOptions: any = {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'category',
        labels: {
          autoRotation: [0, 0],
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Minutes',
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        pointFormat: '<b>{point.y} minutes</b>',
      },
      series: [
        {
          name: 'Workout',
          colors: ['#00ffff8f'],
          colorByPoint: true,
          groupPadding: 0,
          data: seriesData,
          //   dataLabels: {
          enabled: true,
          // rotation: -90,
          color: '#FFFFFF',
          inside: true,
          verticalAlign: 'top',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      ],
    };
    setTimeout(() => {
      Highcharts.chart('container', chartOptions);
    }, 2 + 2);
  }
}
