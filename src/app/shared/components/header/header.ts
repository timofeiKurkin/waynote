import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiTabBarComponent, TuiTabBarItem } from '@taiga-ui/addon-mobile';
import { LogoutService } from '../../../core/auth/logout-service/logout-service';
import { AuthStateService } from '../../../core/auth/auth-state/auth-state-service';
import { filter, map } from 'rxjs';

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
export class Header implements OnInit {
  items = [
    {
      icon: '@tui.house',
      href: '/',
      text: 'Главная',
    },
    {
      icon: '@tui.route',
      href: '/my-trails',
      text: 'Мои маршруты',
    },
    {
      icon: '@tui.circle-plus',
      href: '/create-trail',
      text: 'Создать маршрут',
    },
  ];
  activeItemIndex = signal(0);
  protected open = false;

  constructor(private authStateService: AuthStateService, private userService: LogoutService, private router: Router) {}

  get user() {
    return this.authStateService.user;
  }

  get isAuth() {
    return this.authStateService.isAuth;
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => {
          const currentRoute = event.urlAfterRedirects;

          if (currentRoute === '/login' || currentRoute === '/registration') {
            this.activeItemIndex.set(this.items.length);
            return;
          }

          for (let i = this.items.length - 1; i >= 0; i--) {
            if (currentRoute.startsWith(this.items[i].href)) {
              this.activeItemIndex.set(i);
              break;
            }
          }
        })
      )
      .subscribe();
  }

  setItemIndex(index: number) {
    this.activeItemIndex.set(index);
  }

  logout() {
    this.userService.logout().then(() => {
      this.authStateService.setUser(null);
      this.authStateService.setIsAuth(false);
    });
  }
}
