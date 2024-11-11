import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateToHome(): void {
    const userRole = this.authService.getUserRole();
    console.log('User Role:', userRole); // Log para verificar el rol

    if (userRole === 1) {
      console.log('Navegando a /admin/dashboard');
      this.router.navigate(['/admin']);
    } else if (userRole === 2) {
      console.log('Navegando a /client/dashboard');
      this.router.navigate(['/cliente']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('userRole');

  }
}
