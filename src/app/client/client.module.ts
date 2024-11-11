import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientRoutingModule } from './client-routing.module';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ClientReservasComponent } from './components/client-reservas/client-reservas.component';


@NgModule({
  declarations: [
    ClientDashboardComponent,
    HistorialClienteComponent,
    CarDetailComponent,
    ClientReservasComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    ClientDashboardComponent,
    HistorialClienteComponent,
    CarDetailComponent,
    ClientReservasComponent
  ]
})
export class ClientModule { }
