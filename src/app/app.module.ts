import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { MenuInicioComponent } from './publico/navegacion/menu-inicio/menu-inicio.component';
import { PlanesComponent } from './publico/planes/planes.component';
import { EmpresaComponent } from './publico/empresa/empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuInicioComponent,
    PlanesComponent,
    EmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
