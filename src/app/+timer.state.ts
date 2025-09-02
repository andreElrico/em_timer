import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

// Todo: figure out how _currentTimerFormControl can be inside withProps. Somehow it works with _currentIntervalId.

type State = {
  playingState: 'initial' | 'isPlaying' | 'isPausing';
  countInSeconds: number;
  _currentTimerFormControl: number;
};
const INITIAL_STATE: State = {
  playingState: 'initial',
  countInSeconds: 100,
  _currentTimerFormControl: 0,
};

export const TimerStore = signalStore(
  { providedIn: 'root' },
  withProps((store) => ({
    _currentIntervalId: null as null | NodeJS.Timeout,
  })),
  withState(INITIAL_STATE),
  withMethods((store) => ({
    _killTimer() {
      if (store._currentIntervalId) {
        clearInterval(store._currentIntervalId);
        store._currentIntervalId = null;
      }
    },
    _resetTimer() {
      patchState(store, (state) => ({
        countInSeconds: store._currentTimerFormControl(),
      }));
    },
    _startTimer() {
      const timerId = setInterval(() => {
        patchState(store, (state) => ({
          countInSeconds: Math.max(state.countInSeconds - 1, 0),
        }));
      }, 1000);
      store._currentIntervalId = timerId;
    },
  })),
  withMethods((store) => ({
    onPlay() {
      patchState(store, (state) => ({ playingState: 'isPlaying' as any }));
      store._startTimer();
    },
    onPause() {
      patchState(store, (state) => ({ playingState: 'isPausing' as any }));
      store._killTimer();
    },
    onStop() {
      patchState(store, (state) => ({ playingState: 'initial' as any }));
      store._killTimer();
      store._resetTimer();
    },
    onTimerFormValueChange(countInSeconds: number) {
      patchState(store, (state) => ({
        countInSeconds,
        _currentTimerFormControl: countInSeconds,
      }));
    },
  })),
  withComputed((state) => ({
    showStopButton: computed(() => state.playingState() !== 'initial'),
    showPlayButton: computed(() => state.playingState() !== 'isPlaying'),
    showTimer: computed(() => state.playingState() !== 'initial'),
    disableControls: computed(() => state.playingState() !== 'initial'),
  }))
);
