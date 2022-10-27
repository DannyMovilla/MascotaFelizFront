import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { ListarRolesComponent } from './roles/listar-roles/listar-roles.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { InfoRolesComponent } from './roles/info-roles/info-roles.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListarPlanesComponent } from './planes/listar-planes/listar-planes.component';
import { InfoPlanComponent } from './planes/info-plan/info-plan.component';
import { InfoSucursalComponent } from './sucursal/info-sucursal/info-sucursal.component';
import { ListarSucursalComponent } from './sucursal/listar-sucursal/listar-sucursal.component';

@NgModule({
  declarations: [
    ListarRolesComponent,
    ListarUsuariosComponent,
    InfoRolesComponent,
    ListarPlanesComponent,
    InfoPlanComponent,
    InfoSucursalComponent,
    ListarSucursalComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class AdministracionModule {}
