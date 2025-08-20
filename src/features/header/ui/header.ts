import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../entities/user/state/auth-service';
import {
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiIcon,
  TuiLink,
} from '@taiga-ui/core';
import { UserService } from '../../../entities/user/api/user-service';
import { TuiTabBarComponent, TuiTabBarItem } from '@taiga-ui/addon-mobile';

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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  get user() {
    return this.authService.user;
  }

  get isAuth() {
    return this.authService.isAuth;
  }

  logout() {
    this.userService.logout().then(() => {
      this.authService.setUser(null);
      this.authService.setIsAuth(false);
    });
  }
}
