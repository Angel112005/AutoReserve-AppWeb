import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../shared/models/car';
import { ReservaService } from '../../../core/services/reserva.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {
  car: Car | undefined;
  startDate: string = '';
  endDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private reservaService: ReservaService,  // Agregar el servicio de reserva
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const ID_Auto = Number(this.route.snapshot.paramMap.get('ID_Auto'));
    this.carService.getCarById(ID_Auto).subscribe((car) => {
      this.car = car;
    });
  }

  calculateTotalCost(): number {
    if (this.car && this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return days * this.car.CostoXDia;
    }
    return 0;
  }

  reserveCar(): void {
    const userId = this.authService.getCurrentUser();
    if (userId && this.startDate && this.endDate && this.car && this.car.ID_Auto) {

      this.carService.actualizarEstadoCoche(this.car?.ID_Auto, 'Esperando').subscribe(() => {
        const reserva = {
          ID_Carro: this.car?.ID_Auto,
          ID_User: parseInt(userId),
          PagoTotal: this.calculateTotalCost(),
          FechaInicio: this.startDate,
          FechaFin: this.endDate
        };
      this.reservaService.createReserva(reserva).subscribe(() => {
        alert('Reserva realizada exitosamente.');
        this.router.navigate(['/client/mis-reservas']);
      });
    });
    } else {
      alert('Por favor selecciona las fechas de inicio y fin.');
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/client/dashboard']);
  }

  navigateTo(route: string): void {
    this.router.navigate([`/client/${route}`]);
  }


}
