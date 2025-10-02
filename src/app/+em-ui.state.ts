import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withLinkedState,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { AudioServiceService } from './audio.service';
import { Timer, TimerService } from './timer.service';

// TODO: can all the sounds be handled in one "effect/ computed"-place, we have timerStatus?
// TODO: on finished add Gopal hearth

type State = {};
const INITIAL_STATE: State = {};

export const EM_UI_Store = signalStore(
  { providedIn: 'root' },
  withProps((_) => ({
    audio: inject(AudioServiceService),
    timerService: inject(TimerService),
  })),
  withLinkedState(({ timerService }) => ({
    timer: () => timerService.timer(),
  })),
  withState(INITIAL_STATE),
  withMethods((store) => ({
    onPlay(totalSeconds: number) {
      // onPlay could mean start timer from scratch or resume timer. The decision is made here.
      if (store.timerService.timer().secondsLeft) {
        store.timerService.resumeTimer();
      } else {
        store.timerService.startTimer(totalSeconds);
      }

      store.timer().secondsLeft === store.timer().totalSeconds
        ? store.audio.playSound('gong')
        : store.audio.playSound('pause');
    },
    onPause() {
      store.timerService.pauseTimer();
      store.audio.playSound('pause');
    },
    onStop() {
      if (store.timer().timerStatus !== 'finished') {
        store.audio.playSound('gong');
      }
      store.timerService.stopTimer();
    },
    resetStore() {
      store.timerService.stopTimer();
      patchState(store, INITIAL_STATE);
    },
  })),
  withComputed((state) => ({
    showStopButton: computed(() => state.timer().timerStatus !== 'idle'),
    showPlayButton: computed(
      () =>
        state.timer().timerStatus === 'pausing' ||
        state.timer().timerStatus === 'idle'
    ),
    showTimer: computed(
      () =>
        state.timer().timerStatus === 'playing' ||
        state.timer().timerStatus === 'pausing'
    ),
    showPauseButton: computed(() => state.timer().timerStatus === 'playing'),
    showFinished: computed(() => state.timer().timerStatus === 'finished'),
    disableControls: computed(() => state.timer().timerStatus !== 'idle'),
    blinkTimer: computed(() => state.timer().timerStatus === 'pausing'),
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        if (store.timer().timerStatus === 'finished') {
          store.audio.playSound('gong');

          // after 5 seconds go back to idle state
          setTimeout(() => {
            if (store.timer().timerStatus === 'finished')
              // calling the stopTimer on  timerService. Therefore no extra gong is played.
              store.timerService.stopTimer();
          }, 5000);
        }
      });
    },
  })
);
