import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuActive: boolean = false;
  userRol: string | null = null;
  isAuthenticated: boolean = false;
  routeSubscription: Subscription = new Subscription();
  authSubscription: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.updateUserRole();
    }
    );

    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateUserRole());
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  updateUserRole(): void {
    this.userRol = this.authService.getUserRole();
  }
}
