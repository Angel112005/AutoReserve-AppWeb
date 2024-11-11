import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { DetallesReservaCliente } from '../../../shared/models/detalles-reserva-cliente';
import { AuthService } from '../../../core/services/auth.service';
import { CarService } from '../../../core/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-reservas',
  templateUrl: './client-reservas.component.html',
  styleUrl: './client-reservas.component.css'
})
export class ClientReservasComponent implements OnInit {
  reservasCliente: DetallesReservaCliente[] = [];
  selectedReserva: DetallesReservaCliente | null = null; // Para almacenar la reserva seleccionada para edición
  newStartDate: string = '';
  newEndDate: string = '';
  newTotalCost: number = 0;

  constructor(private reservaService: ReservaService, private authService: AuthService, private carService: CarService, private router: Router ) {}

  ngOnInit(): void {
    // this.cargarReservasCliente();
    this.cargarReservasDisponiblesCliente()
  }

  cargarReservasCliente(): void {
    const userId = this.authService.getCurrentUser(); // Usa el ID del cliente logueado
    this.reservaService.getDetallesReservaCliente(parseInt(userId as string)).subscribe(reservas => {
      console.log(reservas)
      this.reservasCliente = reservas;
    });
  }

  cargarReservasDisponiblesCliente(): void {
    const userId = this.authService.getCurrentUser();
    if (userId) {
      this.reservaService.getReservasDisponiblesCliente(parseInt(userId)).subscribe(reservas => {
        this.reservasCliente = reservas;
      });
    }
  }

  openEditModal(reserva: DetallesReservaCliente): void {
    // Abre la modal y carga los datos de la reserva
    this.selectedReserva = reserva;
    this.newStartDate = reserva.FechaInicio;
    this.newEndDate = reserva.FechaFin;
    this.calculateTotalCost();
  }

  calculateTotalCost(): void {
    if (this.selectedReserva && this.newStartDate && this.newEndDate) {
      const start = new Date(this.newStartDate);
      const end = new Date(this.newEndDate);
      const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1; // Asegura incluir el último día
      this.newTotalCost = days * this.selectedReserva.CostoXDia;
    } else {
      this.newTotalCost = 0;
    }
  }

  saveChanges(): void {
    if (this.selectedReserva) {
      // Actualiza la reserva en la base de datos con las nuevas fechas y costo total
      this.reservaService.updateReserva(this.selectedReserva.ID_Reservas, {
        PagoTotal: this.newTotalCost,
        FechaInicio: this.newStartDate,
        FechaFin: this.newEndDate
      }).subscribe(() => {
        alert('Reserva actualizada');
        this.cargarReservasCliente(); // Vuelve a cargar las reservas
        this.closeModal();
      });
    }
  }

  closeModal(): void {
    // Cierra la modal y limpia los datos
    this.selectedReserva = null;
    this.newStartDate = '';
    this.newEndDate = '';
    this.newTotalCost = 0;
  }

  cancelarReserva(idReserva: number, idCarro: number): void {
    // Primero actualiza el estado del coche a "Disponible"
    this.carService.actualizarEstadoCoche(idCarro, 'Disponible').subscribe(() => {
      // Después de actualizar el estado del coche, elimina la reserva
      this.reservaService.deleteReserva(idReserva).subscribe(() => {
        alert('Reserva cancelada y coche disponible nuevamente');
        this.cargarReservasCliente(); // Vuelve a cargar las reservas
      });
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/client/dashboard']);
  }

  navigateTo(route: string): void {
    this.router.navigate([`/client/${route}`]);
  }

}
