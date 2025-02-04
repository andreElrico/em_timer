import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonToggleModule],
  template: `
  <div style="padding: 1em 20px">
    <header>
      <mat-button-toggle-group [value]="currentRoute" name="fontStyle" aria-label="timer Style">
        <mat-button-toggle [routerLink]="'/em'" value="em">EM</mat-button-toggle>
        <mat-button-toggle [routerLink]="'/dyade'" value="dyade">Dyade</mat-button-toggle>
      </mat-button-toggle-group>
    </header>
    <main>
      <router-outlet />
    </main>
  <div>
  `,
  styles: ``,
})
export class AppComponent {

  // TODO: use angular
  currentRoute = window.location.href.split('/').pop();

}
