import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { authorizeGuard } from './core/guards/authorize.guard';
import { redirectHomeIfLoggedGuard } from './core/guards/redirect-home-if-logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.module').then((m) => m.AuthModule),
        canActivate: [redirectHomeIfLoggedGuard],
      },
    ],
  },
];
