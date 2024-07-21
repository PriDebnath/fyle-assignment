import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './components/workout/workout.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

const routes: Routes = [
  {
    path: 'chart',
    component: WorkoutChartComponent,
  },
  {
    path: '',
    component: WorkoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutRoutingModule {}
