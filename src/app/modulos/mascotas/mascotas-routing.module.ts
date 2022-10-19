import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarMascotasComponent } from './listar-mascotas/listar-mascotas.component';

const routes: Routes = [
  {
    path:'listar',
    component: ListarMascotasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
