import { Route } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { NotFoundPage } from './components/not-found-page/not-found-page';
import { unAuthGuard } from './core/guards/un-auth-guard/un-auth-guard';
import { authGuard } from './core/guards/auth-guard/auth-guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canMatch: [unAuthGuard],
    loadComponent: () => import('./components/login-page/login-page').then(m => m.LoginPage),
    title: 'Аутентификация',
  },
  {
    path: 'registration',
    canMatch: [unAuthGuard],
    loadComponent: () => import('./components/registration-page/registration-page').then(m => m.RegistrationPage),
    title: 'Регистрация',
  },
  {
    path: 'create-trail',
    loadComponent: () => import('./components/create-trail-page/create-trail-page').then(m => m.CreateTrailPage),
    canMatch: [authGuard],
    title: 'Создать новый маршрут',
  },
  {
    path: 'my-trails',
    loadComponent: () => import('./components/my-trails-page/my-trails-page').then(m => m.MyTrailsPage),
    canMatch: [authGuard],
    title: 'Мои маршруты',
  },
  {
    path: 'my-trails/:id',
    loadComponent: () => import('./components/trail-page/trail-page').then(m => m.TrailPage),
    title: 'Подробнее о маршруте',
  },
  {
    path: 'trails',
    component: MainPage,
    title: 'Главная страница',
  },
  {
    path: 'trails/:id',
    loadComponent: () => import('./components/trail-page/trail-page').then(m => m.TrailPage),
    title: 'Подробнее о маршруте',
  },
  {
    path: '',
    redirectTo: 'trails',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundPage,
    title: '404',
  },
];
