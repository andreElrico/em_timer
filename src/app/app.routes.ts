import { inject } from '@angular/core';
import { CanDeactivateFn, Routes } from '@angular/router';
import { EM_UI_Store } from './+em-ui.state';

export const resetStoreGuard: CanDeactivateFn<unknown> = (cmp) => {
  inject(EM_UI_Store).resetStore();

  return true;
};

export const routes: Routes = [
  {
    path: 'em',
    loadComponent: () => import('./em/em.component').then((m) => m.EmComponent),
    pathMatch: 'full',
    canDeactivate: [resetStoreGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'em', pathMatch: 'prefix' },
];
