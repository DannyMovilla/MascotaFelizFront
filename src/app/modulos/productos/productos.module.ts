import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatars';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { InfoProductosComponent } from './info-productos/info-productos.component';
import { ViewProductosComponent } from './view-productos/view-productos.component';


@NgModule({
  declarations: [
    ListarProductosComponent,
    InfoProductosComponent,
    ViewProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
  ]
})
export class ProductosModule { }
