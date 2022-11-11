import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatData } from 'src/app/modelos/chat-data.model';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { SocialService } from 'src/app/services/social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  mensaje: string = '';
  datosUsuario: any;

  constructor(
    public socialServices: SocialService,
    private authServices: SeguridadService
  ) {
    this.socialServices.getChats().subscribe();
    this.datosUsuario = this.authServices.obtenerSession();
  }

  ngOnInit(): void {}

  onEnviarMensaje() {
    if (this.mensaje.length === 0) {
      Swal.fire('Mascota Feliz!', 'Debe ingresar un mensaje', 'success');
      return;
    }

    this.socialServices
      .enviarMensaje(this.mensaje)
      .then(() => (this.mensaje = ''))
      .catch((err) => console.error('Error al enviar', err));
  }
}
