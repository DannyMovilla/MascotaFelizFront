import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfiliacionesRoutingModule } from './afiliaciones-routing.module';
import { InfoAfiliacionComponent } from './info-afiliacion/info-afiliacion.component';
import { ListarAfiliacionesComponent } from './listar-afiliaciones/listar-afiliaciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadoAfiliacionComponent } from './estado-afiliacion/estado-afiliacion.component';

@NgModule({
  declarations: [InfoAfiliacionComponent, ListarAfiliacionesComponent, EstadoAfiliacionComponent],
  imports: [
    CommonModule,
    AfiliacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AfiliacionesModule {}
