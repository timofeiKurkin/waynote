import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiTab, TuiTabsWithMore } from '@taiga-ui/kit';
import { TuiItem } from '@taiga-ui/cdk';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../entities/user/state/auth-service';
import { TuiLink } from '@taiga-ui/core';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    TuiTabsWithMore,
    TuiItem,
    TuiTab,
    NgOptimizedImage,
    RouterLink,
    TuiLink,
  ],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  constructor(private authService: AuthService) {}

  get user() {
    return this.authService.user;
  }

  get isAuth() {
    return this.authService.isAuth;
  }

  protected activeItemIndex = 0;
}
