import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './publico/empresa/empresa.component';
import { InicioComponent } from './publico/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'empresa',
    component: EmpresaComponent
  },
  {
    path: 'security',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then( m => m.SeguridadModule )
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./modulos/mascotas/mascotas.module').then(m => m.MascotasModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio'
  },

  {
    path: '**',
    redirectTo: '/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
