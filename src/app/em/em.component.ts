import { Component, inject } from '@angular/core';
import { TimerStore } from '../+timer.state';

@Component({
  selector: 'app-em',
  imports: [],
  template: ` <p>playingState()</p> `,
  styles: ``,
})
export class EmComponent {
  private readonly store = inject(TimerStore);

  protected readonly playingState = this.store.playingState
}
