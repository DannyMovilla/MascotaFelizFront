import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  datosUsuarioSesion = new BehaviorSubject<any>(new String());

  constructor(private http: HttpClient) {
    this.verificarSessionActual();
  }

  identificarUsuario(usuario: string, contrasena: string) {
    return;
  }

  verificarSessionActual() {
    let datos = this.obtenerSession();
    if (datos) {
      this.refrescarDataSesion(datos);
    }
  }

  refrescarDataSesion(datos: any) {
    this.datosUsuarioSesion.next(datos);
  }

  almacenarSession(datos: string) {
    localStorage.setItem('dataSesion', datos);
    this.refrescarDataSesion(datos);
  }

  obtenerSession() {
    let datosSession = localStorage.getItem('dataSesion');
    if (datosSession) {
      return datosSession;
    } else {
      return null;
    }
  }

  obtenerDatosUserSession() {
    return this.datosUsuarioSesion.asObservable();
  }

  eliminarSession() {
    localStorage.removeItem('dataSesion');
    this.refrescarDataSesion(null);
  }

  seHaIniciadoSesion() {
    let datosSession = localStorage.getItem('dataSesion');
    if (datosSession) {
      return datosSession;
    } else {
      return null;
    }
  }
}
