import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { MenuInicioComponent } from './publico/navegacion/menu-inicio/menu-inicio.component';
import { PlanesComponent } from './publico/planes/planes.component';
import { EmpresaComponent } from './publico/empresa/empresa.component';
import { MenuDasboardComponent } from './publico/navegacion/menu-dasboard/menu-dasboard.component';
import { SucursalesComponent } from './publico/sucursales/sucursales.component';
import { TestimoniosComponent } from './publico/testimonios/testimonios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuInicioComponent,
    PlanesComponent,
    EmpresaComponent,
    MenuDasboardComponent,
    SucursalesComponent,
    TestimoniosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
