import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InfoUsuarioComponent } from './usuarios/info-usuario/info-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { InfoRolComponent } from './roles/info-rol/info-rol.component';
import { ListarPlanesComponent } from './planes/listar-planes/listar-planes.component';
import { InfoPlanComponent } from './planes/info-plan/info-plan.component';

@NgModule({
  declarations: [UsuariosComponent, InfoUsuarioComponent, ListarRolesComponent, InfoRolComponent, ListarPlanesComponent, InfoPlanComponent],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdministracionModule {}
