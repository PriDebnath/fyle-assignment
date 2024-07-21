import { Workout } from './workout.model';

export interface User {
  id?: number;
  name?: string;
  workouts: Workout[];
  totalWorkoutMinutes?: number;
}
