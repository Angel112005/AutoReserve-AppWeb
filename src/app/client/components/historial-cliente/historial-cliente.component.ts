import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { DetallesReservaCliente } from '../../../shared/models/detalles-reserva-cliente';
import { AuthService } from '../../../core/services/auth.service';
import { CarService } from '../../../core/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrl: './historial-cliente.component.css'
})
export class HistorialClienteComponent implements OnInit {
  historialReservas: DetallesReservaCliente[] = [];

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarHistorialReservas();
  }

  cargarHistorialReservas(): void {
    const userId = this.authService.getCurrentUser();
    this.reservaService.getHistorialReservasCliente(parseInt(userId as string)).subscribe(reservas => {
      this.historialReservas = reservas;
    });
  }

  devolverAuto(reserva: DetallesReservaCliente): void {
    this.carService.actualizarEstadoCoche(reserva.ID_Carro, 'Disponible' ).subscribe(() => {
      alert('El coche ha sido devuelto y ahora está disponible.');
      this.cargarHistorialReservas(); // Recargar el historial de reservas para actualizar la vista
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/client/dashboard']);
  }

  navigateTo(route: string): void {
    this.router.navigate([`/client/${route}`]);
  }

}
