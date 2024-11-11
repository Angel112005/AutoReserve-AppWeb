// src/app/core/services/car.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../shared/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
// LOCAL
  // private apiUrl = 'http://localhost:8080/api/autos';
// INSTANCIA
  private apiUrl = 'http://54.160.234.38:8080/api/autos';


  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}`, car);
  }

  // Método para obtener un coche por ID
  getCarById(ID_Auto: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${ID_Auto}`);
  }

  updateCar(ID_Auto: number, car: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${ID_Auto}`, car);
  }

  deleteCar(ID_Auto: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ID_Auto}`);
  }

  // Método para actualizar el estado del coche
  actualizarEstadoCoche(id: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/estado`, { Estado: estado });
  }

}
