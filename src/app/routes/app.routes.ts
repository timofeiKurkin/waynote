import { Route } from '@angular/router';
import { MainPage } from '../components/main-page/main-page';
import { NotFoundPage } from '../components/not-found-page/not-found-page';
import { unAuthGuard } from './guards/un-auth-guard/un-auth-guard';
import { authGuard } from './guards/auth-guard/auth-guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canMatch: [unAuthGuard],
    loadComponent: () => import('../components/login-page/login-page').then(m => m.LoginPage),
    title: 'Аутентификация',
  },
  {
    path: 'registration',
    canMatch: [unAuthGuard],
    loadComponent: () => import('../components/registration-page/registration-page').then(m => m.RegistrationPage),
    title: 'Регистрация',
  },
  {
    path: 'my-routes',
    loadComponent: () => import('../components/my-trails-page/my-trails-page').then(m => m.MyTrailsPage),
    canMatch: [authGuard],
    title: 'Мои маршруты',
  },
  {
    path: 'my-routes/:id',
    loadComponent: () => import('../components/trail-page/trail-page').then(m => m.TrailPage),
  },
  {
    path: 'create-route',
    loadComponent: () => import('../components/create-trail-page/create-trail-page').then(m => m.CreateTrailPage),
    canMatch: [authGuard],
    title: 'Создать новый маршрут',
  },
  {
    path: ':id',
    loadComponent: () => import('../components/trail-page/trail-page').then(m => m.TrailPage),
  },
  {
    path: '',
    component: MainPage,
    title: 'Главная страница',
  },
  {
    path: '**',
    component: NotFoundPage,
    title: '404',
  },
];
