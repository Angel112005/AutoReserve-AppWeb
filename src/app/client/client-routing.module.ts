import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
// import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ClientReservasComponent } from './components/client-reservas/client-reservas.component';

const routes: Routes = [
  { path: '', component: ClientDashboardComponent },
  { path: 'mis-reservas', component: ClientReservasComponent }, // Componente de mis reservas
  { path: 'historial', component: HistorialClienteComponent },      // Componente de historial
  { path: 'car-detail/ID_Auto', component: CarDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
