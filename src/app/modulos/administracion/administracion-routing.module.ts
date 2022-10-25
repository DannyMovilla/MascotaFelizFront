import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {
    path: 'roles',
    component: ListarRolesComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [ValidadorSesionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
