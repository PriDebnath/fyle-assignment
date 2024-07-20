import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css',
})
export class WorkoutComponent implements OnInit {
  formGroup: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.getForm();
  }

  getForm() {
    return this.formBuilder.group({
      user: [''],
    });
  }
}
