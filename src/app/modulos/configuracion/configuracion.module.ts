import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProspectosComponent } from './prospectos/prospectos.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarMenuComponent } from './menu/listar-menu/listar-menu.component';
import { InfoMenuComponent } from './menu/info-menu/info-menu.component';
import { MailComponent } from './mail/mail.component';

@NgModule({
  declarations: [DashboardComponent, ProspectosComponent, PerfilComponent, ListarMenuComponent, InfoMenuComponent, MailComponent],
  imports: [CommonModule, ConfiguracionRoutingModule, NgxChartsModule, FormsModule, ReactiveFormsModule],
})
export class ConfiguracionModule {}
