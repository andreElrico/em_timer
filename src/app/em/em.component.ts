import { Component, effect, inject } from '@angular/core';
import { TimerStore } from '../+timer.state';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { coerceToAtLeastOne } from '../helpers';
import { ProgressTimerComponent } from '../progress-timer/progress-timer.component';

const DEFAULT_TIMER_IN_MINUTES = 1;

// TODO: antipattern make better
let HAS_NOT_RUN = true;

@Component({
  selector: 'app-em',
  imports: [
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ProgressTimerComponent,
  ],
  template: `
    <div class="responsive-wrapper">
      <mat-slider class="!w-full m-0" min="1" max="10" step="1" showTickMarks>
        <input
          [value]="valueControl.value"
          matSliderThumb
          [formControl]="valueControl"
        />
      </mat-slider>

      <mat-form-field class="w-full">
        <mat-label>Minutes</mat-label>
        <input
          min="1"
          [value]="valueControl.value"
          matInput
          type="number"
          [formControl]="valueControl"
          (blur)="onInputBlur()"
        />
      </mat-form-field>

      <span class="mr-1">
        @if ( store.showPlayButton() ) {
        <button mat-fab (click)="store.onPlay()">
          <mat-icon> play_arrow </mat-icon>
        </button>
        } @else {
        <button mat-fab (click)="store.onPause()">
          <mat-icon class="warn"> pause </mat-icon>
        </button>
        }
      </span>
      @if ( store.showStopButton() ) {
      <button class="danger" mat-fab (click)="store.onStop()">
        <mat-icon> stop </mat-icon>
      </button>
      } @if ( store. showTimer() ) {
      <app-progress-timer
        [currentSecondLeft]="store.countInSeconds()"
        [totalSeconds]="(valueControl.value ?? 0) * 60"
        [isBlinking]="store.playingState() === 'isPausing'"
      ></app-progress-timer>
      }
    </div>
  `,
  styles: `
  `,
})
export class EmComponent {
  protected readonly store = inject(TimerStore);

  protected valueControl = new FormControl<number>(DEFAULT_TIMER_IN_MINUTES);

  constructor() {
    this.valueControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        const castValue = coerceToAtLeastOne(value) * 60;
        if (castValue !== this.store.countInSeconds()) {
          this.store.onTimerFormValueChange(castValue);
        }
      });

    // set initial value to store, skip if countInSeconds is different from 1;
    if (HAS_NOT_RUN) {
      this.valueControl.updateValueAndValidity();
      HAS_NOT_RUN = false;
    }

    // change once signal forms are a thing
    effect(() => {
      if (this.store.disableControls()) {
        this.valueControl.disable({ emitEvent: false });
      } else {
        this.valueControl.enable({ emitEvent: false });
      }
    });
  }

  onInputBlur() {
    const value = this.valueControl.value;

    const castValue = coerceToAtLeastOne(value);

    if (value !== castValue) {
      this.valueControl.setValue(castValue);
    }
  }
}
