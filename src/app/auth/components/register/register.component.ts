import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../../../shared/models/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
user: RegisterUser = {
    Nombre: '',
    Apellido: '',
    Email: '',
    Celular: '',
    Direccion: '',
    NumeroLicencia: 0,
    Password: '', // Cambiado a "password"
    idRol: 2 // Siempre será cliente
  };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    console.log('Datos enviados al registrar:', this.user); // Para verificar los datos enviados
    this.authService.register(this.user).subscribe(
      () => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/auth/login']);
      },
      error => {
        alert('Error en el registro: ' + error.message);
      }
    );
  }
}
