import { Routes } from '@angular/router';



export const routes: Routes = [
    { path: 'em', loadComponent: () => import('./em/em.component').then(m => m.EmComponent), pathMatch: 'full'},
    { path: 'dyade', loadComponent: () => import('./dyade/dyade.component').then(m => m.DyadeComponent), pathMatch: 'full' },
    { path: '', redirectTo: 'em', pathMatch: 'prefix' }
];
