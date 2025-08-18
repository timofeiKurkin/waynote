import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../features/header/ui/header';
import { AuthService } from '../entities/user/state/auth-service';

@Component({
  imports: [RouterModule, ReactiveFormsModule, TuiRoot, Header],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   onAuthStateChanged(firebaseAuth, user => {
  //     if (user) {
  //       this.authService.setUser(user);
  //       this.authService.setIsAuth(true);
  //     }
  //   });
  // }
}
