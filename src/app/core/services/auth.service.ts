

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { RegisterUser } from '../../shared/models/register-user';
import { UserResponse } from '../../shared/models/user-response';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // LOCAL
// private baseUrl = 'http://localhost:8080/api/usuarios';
  // INSTANCIA
  private baseUrl = 'http://54.160.234.38:8080/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<UserResponse | null> {
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((user) => {
        if (user) {
          // Guardar el objeto completo del usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(user.id));
          // Guardar el rol del usuario por separado
          this.saveUserRole(user.idRol);
        }
      }),
      catchError((error) => {
        console.error('Error en inicio de sesión:', error);
        return throwError(error);
      })
    );
  }

  // Obtener el usuario actual desde el localStorage
  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
    // return user ? JSON.parse(user) : null;
  }

  // Guardar el rol del usuario en el localStorage
  saveUserRole(idRol: number): void {
    localStorage.setItem('userRole', idRol.toString());
  }

  // Obtener el rol del usuario desde el localStorage
  getUserRole(): number | null {
    const role = localStorage.getItem('userRole');
    return role ? parseInt(role, 10) : null;
  }

  // Cerrar sesión y limpiar el almacenamiento
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth/login']);
  }
}
