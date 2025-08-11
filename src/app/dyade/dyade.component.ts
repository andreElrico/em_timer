import { Component } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider'; 
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';

import { rxState } from '@rx-angular/state';

import {coerceToAtLeastOne} from '../helpers';

type State = {
  playingState: 'initial' | 'isPlaying' | 'isPausing'
}
const INITIAL_STATE: State = 'initial';

@Component({
  selector: 'app-dyade',
  imports: [MatSliderModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  template: `
  <ng-container ngForm>

    <mat-slider style="width: 100%; margin: 0" min="1" max="10" step="1" showTickMarks>
      <input [value]="valueControl.value" matSliderThumb [formControl]="valueControl">
    </mat-slider>

    <mat-form-field style="width: 100%;">
      <mat-label>Minutes</mat-label>
      <input min="1" [value]="valueControl.value" matInput type="number" [formControl]="valueControl">
    </mat-form-field>

    <button mat-fab>
        <mat-icon>play_arrow</mat-icon>
    </button>

    <ng-container>
      <button mat-fab>
          <mat-icon>{{ isPlaying ? 'play_arrow' : 'pause' }}</mat-icon>
      </button>
      <button mat-fab>
          <mat-icon>stop</mat-icon>
      </button>
    </ng-container>

  </ng-container>
  `,
  styles: ``
})
export class DyadeComponent {


  protected valueControl = new FormControl(1);

  private state = rxState<{ state: State }>(({ set, connect }) => {
    // set initial state
    set(INITIAL_STATE);
    // connect data source to state
    connect('movies', this.movieResource.fetchMovies());
  });

  constructor() {
    // No additional logic needed; FormControl handles synchronization
     this.valueControl.valueChanges.subscribe(value => {

      const castValue = coerceToAtLeastOne(value);

      if (value !== castValue) {
        this.valueControl.setValue(castValue) 
      }
    })
  }
}
