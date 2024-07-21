import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { Workout } from '../../../../core/models/workout.model';
import { User } from '../../../../core/models/user.model';
import { SearchPipe } from '../../../../core/pipe/search-pipe/search-pipe.pipe';
import { userData } from '../../data/userData';

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
  initialUserData: User[] = userData;
  userList: User[] = [];
  workoutList: Workout[] = [];
  workoutForm!: FormGroup;
  workoutTypes: string[] = ['Cycling', 'Running', 'Swimming', 'Yoga'];
  filterTypes: string[] = ['All', 'Cycling', 'Running', 'Swimming', 'Yoga'];
  // list
  displayedColumns: string[] = [
    'name',
    'workouts',
    'numberOfWorkouts',
    'totalWorkoutMinutes',
  ];
  search: string = '';
  selectedFilterType: string = 'All';
  dataSource = new MatTableDataSource<User>(this.userList);
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  itemsPerPageOptions = [5, 10, 25, 50];
  pages: number[] = [];
  paginatedData: User[] = [];

  constructor(
    private serachPipe: SearchPipe,
    private cbr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.workoutForm = this.getForm();

    let workoutListLocal =
      this.localStorageService.getParsedValue('workout_list');
    // use mocked data when localstroage is empty
    if (workoutListLocal?.length) {
      this.workoutList = workoutListLocal;
      this.userList = this.convertWorkoutsToUsers(workoutListLocal);
    } else {
      this.userList = this.initialUserData;
    }
    this.updatePagination();

    this.dataSource = new MatTableDataSource<User>(this.userList);
  }

  getForm() {
    return this.formBuilder.group({
      user: ['', Validators.required],
      minutes: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    let formValues = this.workoutForm?.value;
    if (this.workoutForm.valid) {
      this.workoutList.push(formValues);
      let workoutListLocal = JSON.parse(JSON.stringify(this.workoutList));
      this.localStorageService.saveKeyValue('workout_list', workoutListLocal);
      // Set userData
      if (this.workoutList?.length) {
        this.userList = this.convertWorkoutsToUsers(this.workoutList);
      }
      this.dataSource = new MatTableDataSource<User>(this.userList);
      this.updatePagination();
      this.workoutForm.reset();
    } else {
      this.workoutForm.markAllAsTouched();
    }
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

  onModelChange(newValue: string) {
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.userList.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.loadPage();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPage();
    }
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  loadPage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.userList.slice(startIndex, endIndex);
  }

  filterByWorkoutType(selectedType: string): void {
    this.updatePagination();

    if (selectedType != 'All') {
      this.paginatedData = this.paginatedData.filter((item) => {
        let workout_names = item.workouts.map((w) => w.type);
        return workout_names.includes(selectedType);
      });
    } else {
      this.updatePagination();
    }
  }
}
