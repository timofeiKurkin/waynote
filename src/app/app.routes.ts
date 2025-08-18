import { Route } from '@angular/router';
import { MainPage } from '../pages/main-page/main-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';

export const appRoutes: Route[] = [
  {
    path: 'settings',
    loadComponent: () =>
      import('../pages/settings-page/settings-page').then(m => m.SettingsPage),
    title: 'Настройки',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login-page/login-page').then(m => m.LoginPage),
    title: 'Аутентификация',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../pages/registration-page/registration-page').then(
        m => m.RegistrationPage
      ),
    title: 'Регистрация',
  },
  {
    path: 'routes/:id',
    loadComponent: () =>
      import('../pages/route-page/route-page').then(m => m.RoutePage),
  },
  {
    path: 'my-routes',
    loadComponent: () =>
      import('../pages/my-routes-page/my-routes-page').then(
        m => m.MyRoutesPage
      ),
    title: 'Мои маршруты',
  },
  {
    path: 'my-routes/:id',
    loadComponent: () =>
      import('../pages/route-page/route-page').then(m => m.RoutePage),
  },
  {
    path: 'create-route',
    loadComponent: () =>
      import('../pages/create-route-page/create-route-page').then(
        m => m.CreateRoutePage
      ),
    title: 'Создать новый маршрут',
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
