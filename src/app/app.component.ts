import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from './modelos/modelo-identificar';
import { PushNotificationService } from './services/push-notification.service';
import { SeguridadService } from './services/seguridad.service';

declare var $: any;

@Component({
  selector: 'mascota-feliz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mascota-feliz';

  seInicionSesion: boolean = false;
  subs: Subscription = new Subscription();

  mesaggeReceived: any = '';

  constructor(
    private authServices: SeguridadService,
    private pushServices: PushNotificationService
  ) {
    this.pushServices.requestPermission();
  }

  ngOnInit(): void {
    this.subs = this.authServices
      .obtenerDatosUserSession()
      .subscribe((datos: ModeloIdentificar) => {
        this.seInicionSesion = datos.estaIdentificado;
      });

    this.pushServices.listen();

    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
}
