import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { Router } from '@angular/router';
import { Car } from '../../../shared/models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    // this.loadCars();
    this.loadAvailableCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      console.log('Coches cargados desde la base de datos:', this.cars); // Log para verificar los coches cargados
    });
  }

  navigateToAddCar(): void {
    this.router.navigate(['/admin/add-car']);
  }

  navigateToManageReservations(): void {
    this.router.navigate(['/admin/manage-reservations'])
  }

  editCar(car: Car): void {
    // Redirigir a la vista de edición con el ID del auto
    this.router.navigate(['/admin/edit-car', car.ID_Auto]);
  }

  deleteCar(ID_Auto?: number): void {
    if (ID_Auto && confirm('¿Estás seguro de que deseas eliminar este coche?')) {
      this.carService.deleteCar(ID_Auto).subscribe(
        () => {
          alert('Coche eliminado con éxito');
          this.loadCars(); // Recarga la lista de coches después de eliminar uno
        },
        (error) => {
          alert('Error al eliminar el coche');
          console.error('Error al eliminar:', error);
        }
      );
    }
  }

  loadAvailableCars(): void {
    this.carService.getCars().subscribe((cars) => {
      // Filtra solo los autos que tienen el estado "Disponible"
      this.cars = cars.filter(car => car.Estado === 'Disponible');
    });
  }
}
