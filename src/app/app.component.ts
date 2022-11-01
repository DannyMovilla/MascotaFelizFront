import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from './modelos/modelo-identificar';
import { SeguridadService } from './services/seguridad.service';

@Component({
  selector: 'mascota-feliz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mascota-feliz';

  seInicionSesion: boolean = false;
  subs: Subscription = new Subscription();

  constructor(
    private authServices: SeguridadService
  ) {}

  ngOnInit(): void {
    this.subs = this.authServices
      .obtenerDatosUserSession()
      .subscribe((datos: ModeloIdentificar) => {
        this.seInicionSesion = datos.estaIdentificado;
      });
  }
}
