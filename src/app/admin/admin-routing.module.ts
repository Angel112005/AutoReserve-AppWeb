import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarListComponent } from './components/car-list/car-list.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
// import { HistorialComponent } from './components/historial/historial.component';
import { AdminReservasComponent } from './components/reservas/admin-reservas.component';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'add-car', component: AddCarComponent },
  { path: 'edit-car/:id', component: EditCarComponent }, // Ruta para editar coche
  { path: 'reservas', component: AdminReservasComponent },
  { path: '', component: AdminReservasComponent },
  // { path: 'historial', component: HistorialComponent },
  // { path: 'taller', component: TallerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
