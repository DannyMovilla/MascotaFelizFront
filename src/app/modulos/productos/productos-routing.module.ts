import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { ViewProductosComponent } from './view-productos/view-productos.component';

const routes: Routes = [
  {
    path: 'listarProductos',
    component: ListarProductosComponent,
    canActivate: [ValidadorSesionGuard],
  },
  {
    path: 'viewProductos',
    component: ViewProductosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
