import { Component, computed, effect, inject, signal } from '@angular/core';
import { EM_UI_Store } from '../+em-ui.state';
import { ReactiveFormsModule } from '@angular/forms';
import { Control, disabled, form, property } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ProgressTimerComponent } from '../progress-timer/progress-timer.component';
import { AudioServiceService } from '../audio.service';
import { coerceToAtLeastOne } from '../helpers';
import { getState } from '@ngrx/signals';
import { JsonPipe } from '@angular/common';

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
    Control,
  ],
  template: `
    <div class="responsive-wrapper">
      <mat-slider class="!w-full m-0" min="1" max="10" step="1" showTickMarks>
        <input matSliderThumb [control]="this.minutesForm.minutes" />
      </mat-slider>

      <mat-form-field class="w-full">
        <mat-label>Minutes</mat-label>
        <input
          min="1"
          matInput
          type="number"
          [control]="this.minutesForm.minutes"
          (blur)="onInputBlur()"
        />
      </mat-form-field>

      <span class="mr-1">
        @if ( store.showPlayButton() ) {
        <button mat-fab (click)="store.onPlay(castedSeconds())">
          <mat-icon> play_arrow </mat-icon>
        </button>
        } @else { @if (store.showPauseButton() ) {
        <button mat-fab (click)="store.onPause()">
          <mat-icon class="warn"> pause </mat-icon>
        </button>
        } }
      </span>
      @if ( store.showStopButton() ) {
      <button class="danger" mat-fab (click)="store.onStop()">
        <mat-icon> stop </mat-icon>
      </button>
      } @if ( store. showTimer() ) {
      <app-progress-timer
        [currentSecondLeft]="store.timer().secondsLeft"
        [totalSeconds]="store.timer().totalSeconds"
        [isBlinking]="store.blinkTimer()"
      ></app-progress-timer>
      } @if ( store.showFinished() ) {
      <p class="mt-8 text-4xl">Times up !!!</p>
      }
    </div>
  `,
  styles: `
  `,
})
export class EmComponent {
  protected readonly store = inject(EM_UI_Store);
  protected readonly audio = inject(AudioServiceService);

  protected readonly minutes = signal({ minutes: 1 });

  protected readonly minutesForm = form(this.minutes, (path) => {
    disabled(path.minutes, () => this.store.disableControls());
  });

  protected readonly castedSeconds = computed(
    () => this.minutes().minutes * 60
  );

  getState() {
    return getState(this.store);
  }

  onInputBlur() {
    const minutesValue = this.minutesForm().value().minutes;

    const castValue = coerceToAtLeastOne(minutesValue);

    if (minutesValue !== castValue) {
      const value = this.minutesForm().value();
      this.minutesForm().value.set({ ...value, minutes: castValue });
    }
  }
}
