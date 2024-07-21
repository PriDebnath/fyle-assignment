import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './components/workout/workout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipe/search-pipe/search-pipe.pipe';
import { HighchartsChartModule } from 'highcharts-angular';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { WorkoutRoutingModule } from './workout-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [WorkoutComponent, SearchPipe, WorkoutChartComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    WorkoutRoutingModule,
  ],
  providers: [SearchPipe],
})
export class WorkoutModule {}
