import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { ListarAfiliacionesComponent } from './listar-afiliaciones/listar-afiliaciones.component';

const routes: Routes = [
  {
    path: 'afiliaciones',
    component: ListarAfiliacionesComponent,
    canActivate: [ValidadorSesionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfiliacionesRoutingModule { }
