import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InfoUsuarioComponent } from './usuarios/info-usuario/info-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuariosComponent, InfoUsuarioComponent],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdministracionModule {}
