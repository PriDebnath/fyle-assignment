import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutComponent } from './workout.component';
import { SearchPipe } from '../../../../core/pipe/search-pipe/search-pipe.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { userData } from '../../data/userData';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

describe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;
  let localStorageService: LocalStorageService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutComponent, SearchPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

      providers: [SearchPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize userList and workoutForm on ngOnInit', () => {
    spyOn(localStorageService, 'getParsedValue').and.returnValue(null);
    component.ngOnInit();
    expect(component.userList).toEqual(userData);
    expect(component.workoutForm).toBeDefined();
  });
});
