import { Routes } from '@angular/router';
import { EmComponent } from './em/em.component';
import { DyadeComponent } from './dyade/dyade.component';

export const routes: Routes = [
    { path: 'em', component: EmComponent, pathMatch: 'full'},
    { path: 'dyade', component: DyadeComponent, pathMatch: 'full' },
    { path: '', redirectTo: 'em', pathMatch: 'prefix' }
];
