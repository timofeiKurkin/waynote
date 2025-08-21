import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiTabBarComponent, TuiTabBarItem } from '@taiga-ui/addon-mobile';
import { LogoutService } from '../../../core/auth/logout-service/logout-service';
import { AuthStateService } from '../../../core/auth/auth-state/auth-state-service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    TuiLink,
    TuiButton,
    TuiIcon,
    TuiDropdown,
    TuiDataList,
    TuiTabBarComponent,
    TuiTabBarItem,
  ],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  items = [
    {
      icon: '@tui.house',
      href: '/',
      text: 'Главная',
    },
    {
      icon: '@tui.route',
      href: '/my-routes',
      text: 'Мои маршруты',
    },
    {
      icon: '@tui.circle-plus',
      href: '/create-route',
      text: 'Создать маршрут',
    },
  ];
  protected open = false;

  constructor(private authStateService: AuthStateService, private userService: LogoutService) {}

  get user() {
    return this.authStateService.user;
  }

  get isAuth() {
    return this.authStateService.isAuth;
  }

  logout() {
    this.userService.logout().then(() => {
      this.authStateService.setUser(null);
      this.authStateService.setIsAuth(false);
    });
  }
}
