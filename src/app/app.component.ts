import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonToggleModule],
  template: `
  <mat-button-toggle-group [value]="currentRoute" name="fontStyle" aria-label="timer Style">
    <mat-button-toggle [routerLink]="'/em'" value="em">EM</mat-button-toggle>
    <mat-button-toggle [routerLink]="'/dyade'" value="dyade">Dyade</mat-button-toggle>
  </mat-button-toggle-group>

  <router-outlet />
  `,
  styles: ``,
})
export class AppComponent {

  // TODO: use angular
  currentRoute = window.location.href.split('/').pop();

}
