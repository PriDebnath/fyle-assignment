import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPipe } from './core/pipe/search-pipe/search-pipe.pipe';
import { WorkoutModule } from './module/workout/workout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    WorkoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    SearchPipe, // Add the pipe to the providers array
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
