import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  fgValidador: FormGroup = this.fb.group({});

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: SeguridadService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fgValidador = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {}

  onIngresar() {
    let usuario = this.fgValidador.controls['usuario'].value;
    let contrasena = this.fgValidador.controls['contrasena'].value;

    let claveCifrada = CryptoJS.MD5(contrasena).toString();

    this.authService.loginUsuario(usuario, claveCifrada).subscribe(
      (datos: any) => {
        Swal.fire(
          'Mascota Feliz!',
          'Bienvenido ' + datos.datos.nombre,
          'success'
        );

        this.authService.almacenarSession(datos);
        this.router.navigateByUrl('/mascotas/listar');

        this.bsModalRef?.hide();
      },
      (error: any) => {
        console.log(error);

        Swal.fire(
          'Mascota Feliz!',
          'Usuario o contraseña no válidos',
          'warning'
        );
      }
    );
  }

  get usuarioNoValido() {
    return (
      this.fgValidador.get('usuario')?.invalid &&
      (this.fgValidador.get('usuario')?.dirty ||
        this.fgValidador.get('usuario')?.touched)
    );
  }

  get contrasenaNoValido() {
    return (
      this.fgValidador.get('contrasena')?.invalid &&
      (this.fgValidador.get('contrasena')?.dirty ||
        this.fgValidador.get('contrasena')?.touched)
    );
  }
}
