import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModeloIdentificar } from '../modelos/modelo-identificar';
import firebase from 'firebase/compat/app';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../modelos/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  datosUsuarioSesion = new BehaviorSubject<ModeloIdentificar>(
    new ModeloIdentificar()
  );

  constructor(
    private http: HttpClient,
    public auth: AngularFireAuth,
    private usuarioServicio: UsuarioService,
    private router: Router,
  ) {
    this.verificarSessionActual();
  }

  registerGoogle(idRolCliente: String) {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user: any) => {
        let newUsuario = new Usuario();
        newUsuario.nombres = user.additionalUserInfo.profile.given_name;
        newUsuario.apellidos = user.additionalUserInfo.profile.family_name;
        newUsuario.correo = user.user.email;
        newUsuario.foto = user.additionalUserInfo.profile.picture;
        newUsuario.rolId = String(idRolCliente);

        this.usuarioServicio.newUsuario(newUsuario).subscribe({
          next: (data) => {
            if (data) {
              Swal.fire(
                'Bienvenido a Mascota Feliz!',
                'Usted recibirá un correo con mayor información.',
                'success'
              );
            } else {
              console.log('Error almacenando');
            }
          },
        });
      });
  }

  loginGoogle() {

    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user: any) => {
        this.loginUsuarioGoogle(user.user.email).subscribe(
          (datos: any) => {
            Swal.fire(
              'Mascota Feliz!',
              'Bienvenido ' + datos.datos.nombre + ', un gusto volverte a ver.',
              'success'
            );

            this.almacenarSession(datos);

            if (datos.rolUsuario.codigo != 'CLIENTE') {
              this.router.navigateByUrl('/configuracion/dashboard');
            } else {
              this.router.navigateByUrl('/afiliaciones/afiliaciones');
            }
          },
          (errorServicio) => {
            Swal.fire(
              'Mascota Feliz!',
              'Usted no se ha registrado en nuestra plataforma, lo invitamos a registrarse.',
              'warning'
            );
          }
        );
      });
  }

  logout() {
    this.auth.signOut();
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
    this.logout();
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

  loginUsuarioGoogle(usuario: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(
      `${environment.urlMascostaFelizApi}/loginGoogle`,
      {
        usuario: usuario,
      },
      {}
    );
  }

  resetPassword(usuario: string): Observable<any> {
    return this.http.post<ModeloIdentificar>(
      `${environment.urlMascostaFelizApi}/reset-password/${usuario}`,
      {},
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

  obtenerRolSesion() {
    return null != this.obtenerSession()
      ? this.obtenerSession().rolUsuario.codigo
      : null;
  }
}
