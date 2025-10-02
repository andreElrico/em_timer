import { Injectable, signal } from '@angular/core';
import { deepComputed } from '@ngrx/signals';

type TimerStatus = 'idle' | 'playing' | 'pausing' | 'finished';
export type Timer = {
  totalSeconds: number;
  secondsLeft: number;
  timerStatus: TimerStatus;
};

export const INITIAL_STATE: Timer = {
  totalSeconds: 0,
  secondsLeft: 0,
  timerStatus: 'idle',
};

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _totalSeconds = signal(INITIAL_STATE.totalSeconds);
  private _secondsLeft = signal(INITIAL_STATE.secondsLeft);
  private _timerState = signal(INITIAL_STATE.timerStatus);

  private _currentIntervalId: NodeJS.Timeout | null = null;

  timer = deepComputed<Timer>(() => ({
    totalSeconds: this._totalSeconds(),
    secondsLeft: this._secondsLeft(),
    timerStatus: this._timerState(),
  }));

  private _startInterval() {
    if (this._currentIntervalId) {
      clearInterval(this._currentIntervalId);
      this._currentIntervalId = null;
    }

    this._currentIntervalId = setInterval(() => {
      const nextCount = this._secondsLeft() - 1;

      if (nextCount) {
        this._secondsLeft.set(Math.max(this._secondsLeft() - 1, 0));

        return;
      }

      // timer is zero, times up!
      this._timerState.set('finished');

      if (this._currentIntervalId) {
        clearInterval(this._currentIntervalId);
      }
    }, 1000);
  }

  startTimer(timeInSeconds: number) {
    this._totalSeconds.set(timeInSeconds);
    this._secondsLeft.set(timeInSeconds);
    this._timerState.set('playing');

    this._startInterval();
  }

  resumeTimer() {
    this._timerState.set('playing');

    this._startInterval();
  }

  pauseTimer() {
    this._timerState.set('pausing');

    // stop the interval
    if (this._currentIntervalId) {
      clearInterval(this._currentIntervalId);
      this._currentIntervalId = null;
    }
  }

  stopTimer() {
    this._timerState.set(INITIAL_STATE.timerStatus);
    this._secondsLeft.set(INITIAL_STATE.secondsLeft);
    this._totalSeconds.set(INITIAL_STATE.totalSeconds);

    // stop the interval
    if (this._currentIntervalId) {
      clearInterval(this._currentIntervalId);
      this._currentIntervalId = null;
    }
  }

  constructor() {
    // TODO create effect that will set after 5 seconds return from finished to idle.
  }
}
