import { Component, signal } from '@angular/core';
import { AudioName } from '../audio.service';
import { form } from '@angular/forms/signals';

// TODO: "formArray"
// service for complex timers, service exposes signal. Connect service signal via linkedState in EM_UI_Store. Service does sync with localStorage

type AtomicTimer = {
  totalSeconds: number;
  startSound: AudioName | 'none';
  endSound: AudioName | 'none';
  displayMessage: string;
};
type TimerSequence = {
  name: string;
  atomicTimers: AtomicTimer[];
};
export type ComplexTimers = TimerSequence[];

type SettingsForm = {
  complexTimers: ComplexTimers;
};

@Component({
  selector: 'app-settings',
  imports: [],
  template: ``,
  styles: ``,
})
export class SettingsComponent {
  private readonly settings = signal<SettingsForm>({ complexTimers: [] });

  settingsForm = form(this.settings, (path) => {
    // disabled(path.minutes, () => this.store.disableControls());
  });

  constructor() {}
}
