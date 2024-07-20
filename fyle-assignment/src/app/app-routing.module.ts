import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './module/workout/components/workout/workout.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutComponent,
    loadChildren: () =>
      import('./module/workout/workout.module').then((m) => m.WorkoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
