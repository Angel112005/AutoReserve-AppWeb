import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../shared/models/car';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService, private router: Router, private AuthService: AuthService) {}

  ngOnInit(): void {
    this.loadAvailableCars();
    console.log(
      this.AuthService.getCurrentUser()
    );
    // this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/client/${route}`]);
  }

  goToDetail(ID_Auto: number): void {
    this.router.navigate(['/client/car-detail', ID_Auto]);
  }

  loadAvailableCars(): void {
    this.carService.getCars().subscribe((cars) => {
      // Filtra solo los autos que tienen el estado "Disponible"
      this.cars = cars.filter(car => car.Estado === 'Disponible');
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/client/dashboard']);
  }

}
