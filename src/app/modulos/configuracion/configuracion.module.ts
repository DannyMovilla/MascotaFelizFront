import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProspectosComponent } from './prospectos/prospectos.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, ProspectosComponent, PerfilComponent],
  imports: [CommonModule, ConfiguracionRoutingModule, NgxChartsModule, FormsModule, ReactiveFormsModule],
})
export class ConfiguracionModule {}
