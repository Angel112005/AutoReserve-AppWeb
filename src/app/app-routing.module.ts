import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// COMPONENTES AUTENTICACION
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
// COMPONENTES CLIENTE
import { ClientDashboardComponent } from './client/components/client-dashboard/client-dashboard.component';
import { HistorialClienteComponent } from './client/components/historial-cliente/historial-cliente.component';
import { ClientReservasComponent } from './client/components/client-reservas/client-reservas.component';
// COMPONENTES ADMIN
import { CarListComponent } from './admin/components/car-list/car-list.component';
import { AddCarComponent } from './admin/components/add-car/add-car.component';
import { EditCarComponent } from './admin/components/edit-car/edit-car.component';
import { CarDetailComponent } from './client/components/car-detail/car-detail.component';
import { AdminReservasComponent } from './admin/components/reservas/admin-reservas.component';

const routes: Routes = [
// RUTAS AUTENTICACION
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
// RUTAS ADMIN
  { path: 'admin/dashboard', component: CarListComponent }, // Ruta para admin
  { path: 'admin/add-car', component: AddCarComponent }, // Ruta para agregar coche
  { path: 'admin/edit-car/:ID_Auto', component: EditCarComponent }, // Asegúrate de que esta ruta está bien definida
  { path: 'admin/manage-reservations', component: AdminReservasComponent},
// RUTAS CLIENTE
  { path: 'client/dashboard', component: ClientDashboardComponent }, // Ruta para cliente
  { path: 'client/mis-reservas', component: ClientReservasComponent}, // Ruta para cliente
  { path: 'client/historial', component: HistorialClienteComponent }, // Ruta para cliente
  { path: 'client/car-detail/:ID_Auto', component: CarDetailComponent }, // Ruta para el detalle del coche

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
