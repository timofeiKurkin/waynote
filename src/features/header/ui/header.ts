import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../entities/user/state/auth-service';
import { TuiLink } from '@taiga-ui/core';
import { UserService } from '../../../entities/user/api/user-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage, RouterLink, TuiLink],
  templateUrl: './header.html',
  styleUrl: './header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  constructor(
    private authService: AuthService,
    private userService: UserService
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
