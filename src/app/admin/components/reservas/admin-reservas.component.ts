import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { DetallesReservaAdmin } from '../../../shared/models/detalles-reserva-admin';
import { CarService } from '../../../core/services/car.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-reservas',
  templateUrl: './admin-reservas.component.html',
  styleUrl: './admin-reservas.component.css'
})
export class AdminReservasComponent implements OnInit {
  reservasAdmin: DetallesReservaAdmin[] = [];

  constructor( private carService: CarService, private reservaService: ReservaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarReservasAdmin();
  }

  cargarReservasAdmin(): void {
    this.reservaService.getReservasConCochesDisponibles().subscribe(reservas => {
      console.log(reservas)
      this.reservasAdmin = reservas;
    });
  }

  aceptarReserva(reserva: DetallesReservaAdmin): void {
    // Actualiza la reserva como aceptada
    // this.reservaService.aceptarReserva(reserva.ID_Reservas).subscribe(() => {
      // alert('Reserva aceptada');

      // Cambia el estado del coche a "Ocupado"
      this.carService.actualizarEstadoCoche(reserva.ID_Carro, 'Ocupado').subscribe(() => {
        console.log(reserva)
        console.log('id de carro:', reserva.ID_Carro)
        alert('Estado del coche actualizado a Ocupado');
        this.cargarReservasAdmin(); // Recarga las reservas después de la actualización
      });

  }

  rechazarReserva(reservaId: number): void {
    this.reservaService.deleteReserva(reservaId).subscribe(() => {
      alert('Reserva rechazada');
      this.cargarReservasAdmin();
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/admin/dashboard']);
  }

}
