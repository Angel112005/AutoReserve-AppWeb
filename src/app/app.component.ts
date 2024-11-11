import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoReserveApp';

  showHeader = true;

  constructor(private router: Router, private authService: AuthService) {
    // Escucha cambios en la navegación para actualizar `showHeader`
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.url;
        // Oculta el header en rutas específicas (login y register)
        this.showHeader = !(currentUrl.includes('/auth/login') || currentUrl.includes('/auth/register'));
      });
  }

}
