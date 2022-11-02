import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { ListarPlanesComponent } from './planes/listar-planes/listar-planes.component';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { ListarSucursalesComponent } from './sucursales/listar-sucursales/listar-sucursales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'roles',
    component: ListarRolesComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'planes',
    component: ListarPlanesComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'sucursales',
    component: ListarSucursalesComponent,
    canActivate: [ValidadorSesionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
