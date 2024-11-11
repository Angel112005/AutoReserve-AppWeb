import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../../shared/models/reserva';
import { DetallesReservaCliente } from '../../shared/models/detalles-reserva-cliente';
import { DetallesReservaAdmin } from '../../shared/models/detalles-reserva-admin';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ReservaService {
  private baseUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) {}


  createReserva(reserva: Partial<Reserva>): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.baseUrl}`, reserva);
  }


  updateReserva(id: number, data: Partial<Reserva>): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.baseUrl}/${id}`, data);
  }

  deleteReserva(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.baseUrl}`);
  }


  getDetallesReservaCliente(id: number): Observable<DetallesReservaCliente[]> {
    return this.http.get<DetallesReservaCliente[]>(`${this.baseUrl}/details/${id}`);
  }

  getDetallesReservaAdmin(): Observable<DetallesReservaAdmin[]> {
    return this.http.get<DetallesReservaAdmin[]>(`${this.baseUrl}/details/info/all`);
  }

  getReservasConCochesDisponibles(): Observable<DetallesReservaAdmin[]> {
    return this.http.get<DetallesReservaAdmin[]>(`${this.baseUrl}/details/info/all`).pipe(
      map(reservas => reservas.filter(reserva => reserva.Estado === 'Esperando'))
    );
  }

  // ReservaService
  getHistorialReservasCliente(id: number): Observable<DetallesReservaCliente[]> {
    return this.http.get<DetallesReservaCliente[]>(`${this.baseUrl}/details/${id}`).pipe(
      map(reservas => reservas.filter(reserva => reserva.Estado === 'Ocupado'))
    );
  }

  getReservasDisponiblesCliente(userId: number): Observable<DetallesReservaCliente[]> {
    return this.http.get<DetallesReservaCliente[]>(`${this.baseUrl}/details/${userId}`).pipe(
      map(reservas => reservas.filter(reserva => reserva.Estado === 'Esperando'))
    );
  }

}
