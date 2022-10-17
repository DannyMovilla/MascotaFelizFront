import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { MenuInicioComponent } from './publico/navegacion/menu-inicio/menu-inicio.component';
import { PlanesComponent } from './publico/planes/planes.component';
import { EmpresaComponent } from './publico/empresa/empresa.component';
import { MenuDasboardComponent } from './publico/navegacion/menu-dasboard/menu-dasboard.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuInicioComponent,
    PlanesComponent,
    EmpresaComponent,
    MenuDasboardComponent
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
