import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './publico/empresa/empresa.component';
import { InicioComponent } from './publico/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
  },
  {
    path: 'security',
    loadChildren: () =>
      import('./modulos/seguridad/seguridad.module').then(
        (m) => m.SeguridadModule
      ),
  },
  {
    path: 'configuracion',
    loadChildren: () =>
      import('./modulos/configuracion/configuracion.module').then(
        (m) => m.ConfiguracionModule
      ),
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./modulos/administracion/administracion.module').then(
        (m) => m.AdministracionModule
      ),
  },
  {
    path: 'afiliaciones',
    loadChildren: () =>
      import('./modulos/afiliaciones/afiliaciones.module').then(
        (m) => m.AfiliacionesModule
      ),
  },
  {
    path: 'social',
    loadChildren: () =>
      import('./modulos/social/social.module').then((m) => m.SocialModule),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./modulos/productos/productos.module').then(
        (m) => m.ProductosModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: '**',
    redirectTo: '/inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
