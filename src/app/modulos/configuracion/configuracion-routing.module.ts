import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListarMenuComponent } from './menu/listar-menu/listar-menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProspectosComponent } from './prospectos/prospectos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'prospectos',
    component: ProspectosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'menu',
    component: ListarMenuComponent,
    canActivate: [ValidadorSesionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
