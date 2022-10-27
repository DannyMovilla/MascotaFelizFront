import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { PrincipalComponent } from './dashboard/principal/principal.component';
import { ListarProspectosComponent } from './prospectos/listar-prospectos/listar-prospectos.component';

const routes: Routes = [
  {
    path: 'prospectos',
    component: ListarProspectosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'dashboard',
    component: PrincipalComponent,
    canActivate: [ValidadorSesionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
