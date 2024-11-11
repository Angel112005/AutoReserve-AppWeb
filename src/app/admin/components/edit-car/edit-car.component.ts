import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../shared/models/car';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit {
  car: Partial<Car> = {};

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const ID_Auto = Number(this.route.snapshot.paramMap.get('ID_Auto'));
    if (isNaN(ID_Auto)) {
      alert('ID de coche inválido');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.carService.getCarById(ID_Auto).subscribe(
        (car) => {
          this.car = car;
        },
        (error) => {
          alert('Error al cargar los datos del coche');
          this.router.navigate(['/admin/dashboard']);
        }
      );
    }
  }


  saveChanges(): void {
    if (this.car.ID_Auto) {
      this.carService.updateCar(this.car.ID_Auto, this.car).subscribe(() => {
        alert('Cambios guardados exitosamente');
        this.router.navigate(['/admin/dashboard']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
