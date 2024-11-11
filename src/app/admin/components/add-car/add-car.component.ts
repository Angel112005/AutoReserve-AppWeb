import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../core/services/car.service';
import { Router } from '@angular/router';
import { Car } from '../../../shared/models/car';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  car: Car = {
    Marca: '',
    Modelo: '',
    Generacion: 0,
    Matricula: '',
    Tipo: '',
    Transmision: '',
    Pasajeros: 0,
    CostoXDia: 0,
    Estado: 'Disponible'
  };

  marcas: string[] = ['Volkswagen', 'Porsche', 'Mercedes-Benz', 'Chevrolet', 'Nissan'];
  tipos: string[] = ['SUV', 'Sedán', 'Mini SUV'];
  text!: string

  constructor(private carService: CarService, private router: Router) {}

  onSubmit(): void {
    this.carService.addCar(this.car).subscribe(() => {
      alert('Coche agregado con éxito');
      this.router.navigate(['/admin/dashboard']);
    });
  }


  navigateToHome(): void {
    this.router.navigate(['/admin/dashboard']);
  }

}
