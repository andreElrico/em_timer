import { signalStore, withState } from '@ngrx/signals';

type State = {
  playingState: 'initial' | 'isPlaying' | 'isPausing'
}
const INITIAL_STATE: State = {
  playingState: 'initial'
};

export const TimerStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE)
);