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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AuthInterceptorService } from './seguridad/auth-interceptor.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './publico/navegacion/footer/footer.component';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('es', esLocale);

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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    provideFirestore(() => getFirestore()),
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use('es');
  }
}
