import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { formatSecondsToMmSs } from '../helpers';

@Component({
  selector: 'app-progress-timer',
  imports: [],
  template: `
    <div class="circular-progress">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        aria-labelledby="title"
        role="graphic"
      >
        <title id="title">svg circular progress bar</title>
        <circle cx="50" cy="50" r="35"></circle>
        <circle
          [class.blinking]="isBlinking()"
          #pctInd
          cx="50"
          cy="50"
          r="40"
        ></circle>
      </svg>
      <p class="pct">{{ displayTime() }}</p>
    </div>
  `,
  styleUrl: './progress-timer.component.scss',
})
export class ProgressTimerComponent {
  currentSecondLeft = input(100);
  totalSeconds = input(100);
  isBlinking = input(false);
  pctIndicator = viewChild<ElementRef<SVGCircleElement>>('pctInd');
  valueInPct = computed(() => this.currentSecondLeft() / this.totalSeconds());
  displayTime = computed(() => formatSecondsToMmSs(this.currentSecondLeft()));

  constructor() {
    effect(() => {
      const p = (1 - this.valueInPct()) * (2 * (22 / 7) * 40);
      if (this.pctIndicator()?.nativeElement?.style) {
        (
          this.pctIndicator() as any
        ).nativeElement.style = `stroke-dashoffset: ${p};`;
      }
    });
  }
}
