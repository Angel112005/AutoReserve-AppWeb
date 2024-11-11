import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    Email: '',
    Password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        // Guarda el rol en el localStorage
        this.authService.saveUserRole(response.idRol);
        // this.authService.saveUserId(response.ID_User);

        if (response.idRol === 1) {
          this.router.navigate(['admin/dashboard']);
        } else if (response.idRol === 2) {
          this.router.navigate(['client/dashboard']);
        }
      },
      error => {
        alert('Error al iniciar sesión');
      }
    );
  }
}
