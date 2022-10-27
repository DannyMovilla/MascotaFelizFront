import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { ListarPlanesComponent } from './planes/listar-planes/listar-planes.component';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { ListarSucursalComponent } from './sucursal/listar-sucursal/listar-sucursal.component';
import { InfoUsuariosComponent } from './usuarios/info-usuarios/info-usuarios.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  {
    path: 'roles',
    component: ListarRolesComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'infoUsuario',
    component: InfoUsuariosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'planes',
    component: ListarPlanesComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'sucursales',
    component: ListarSucursalComponent,
    canActivate: [ValidadorSesionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
