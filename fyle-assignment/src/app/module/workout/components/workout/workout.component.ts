import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { Workout } from '../../../../core/models/workout.model';

interface WorkoutData {
  user: string;
  workouts: string;
  numberOfWorkouts: number;
  totalWorkoutMinutes: number;
}
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css',
})
export class WorkoutComponent implements OnInit {
  w: any = [];
  workoutForm!: FormGroup;
  workoutTypes: string[] = ['Cycling', 'Running', 'Swimming', 'Yoga'];
  displayedColumns: string[] = [
    'name',
    'workouts',
    'numberOfWorkouts',
    'totalWorkoutMinutes',
  ];

  // Mock data, replace this with real data from the form or backend
  ELEMENT_DATA: WorkoutData[] = [
    {
      user: 'John Doe',
      workouts: 'Running, Cycling',
      numberOfWorkouts: 2,
      totalWorkoutMinutes: 75,
    },
    {
      user: 'Jane Smith',
      workouts: 'Swimming, Running',
      numberOfWorkouts: 2,
      totalWorkoutMinutes: 80,
    },
    {
      user: 'Mike Johnson',
      workouts: 'Yoga, Cycling',
      numberOfWorkouts: 2,
      totalWorkoutMinutes: 90,
    },
  ];
  dataSource = new MatTableDataSource<WorkoutData>(this.ELEMENT_DATA);

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.workoutForm = this.getForm();
    let ws = this.localStorageService.getParsedValue('workout_list');

    let u: any = {};
    ws.map((w: Workout) => {
      if (!u[w.user!]) {
        u[w.user!] = {
          id: Object.keys(u).length + 1,
          name: w.user!,
          workouts: [],
        };
      }

      u[w.user!].workouts.push(w);
    });
    console.log({ u });
    console.log(Object.values(u));

    //
    if (ws) {
      this.w = ws;
    }
    console.log({ ws });
  }

  getForm() {
    return this.formBuilder.group({
      user: ['sss', Validators.required],
      minutes: ['10', Validators.required],
      type: ['', Validators.required],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    let formValues = this.workoutForm?.value;
    console.log(this.workoutForm.valid);
    if (this.workoutForm.valid) {
      console.log(this.workoutForm.value);
      this.w.push(this.workoutForm.value);
      console.log('w-->', this.w);
      this.localStorageService.saveKeyValue('workout_list', this.w);
    } else {
      this.workoutForm.markAllAsTouched();
    }
  }
}
