import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModeloIdentificar } from '../modelos/modelo-identificar';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  datosUsuarioSesion = new BehaviorSubject<ModeloIdentificar>(
    new ModeloIdentificar()
  );

  constructor(private http: HttpClient) {
    this.verificarSessionActual();
  }

  verificarSessionActual() {
    let datos = this.obtenerSession();
    if (datos) {
      this.refrescarDataSesion(datos);
    }
  }

  refrescarDataSesion(datos: ModeloIdentificar) {
    this.datosUsuarioSesion.next(datos);
  }

  almacenarSession(datos: ModeloIdentificar) {
    datos.estaIdentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem('datosSesion', stringDatos);
    this.refrescarDataSesion(datos);
  }

  obtenerSession() {
    let datosString = localStorage.getItem('datosSesion');
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos;
    } else {
      return null;
    }
  }

  obtenerDatosUserSession() {
    return this.datosUsuarioSesion.asObservable();
  }

  eliminarSession() {
    localStorage.removeItem('datosSesion');
    this.refrescarDataSesion(new ModeloIdentificar());
  }

  seHaIniciadoSesion() {
    let datosString = localStorage.getItem('datosSesion');
    return datosString;
  }

  loginUsuario(
    usuario: string,
    contrasena: string
  ): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(
      `${environment.urlMascostaFelizApi}/login`,
      {
        usuario: usuario,
        contrasena: contrasena,
      },
      {}
    );
  }

  ObtenerToken() {
    let datosString = localStorage.getItem('datosSesion');
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos.tk;
    } else {
      return '';
    }
  }
}
