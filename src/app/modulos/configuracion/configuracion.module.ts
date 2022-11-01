import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProspectosComponent } from './prospectos/prospectos.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DashboardComponent, ProspectosComponent],
  imports: [CommonModule, ConfiguracionRoutingModule, NgxChartsModule],
})
export class ConfiguracionModule {}
