import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { CarListComponent } from './components/car-list/car-list.component';
import { AddCarComponent } from './components/add-car/add-car.component';
// import { ReservasComponent } from './components/admin-reservas/reservas.component';
// import { HistorialComponent } from './components/historial/historial.component';
// import { TallerComponent } from './components/taller/taller.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { AdminReservasComponent } from './components/reservas/admin-reservas.component';
// import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarListComponent,
    AddCarComponent,
    // ReservasComponent,
    // HistorialComponent,
    EditCarComponent,
    AdminReservasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
  ],
  exports: [
    CarListComponent,
    AddCarComponent,
    // ReservasComponent,
    // HistorialComponent,
    EditCarComponent,
    AdminReservasComponent
  ]
})
export class AdminModule { }
