import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/seguridad/validador-sesion.guard';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: 'chats',
    component: ChatComponent,
    canActivate: [ValidadorSesionGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
