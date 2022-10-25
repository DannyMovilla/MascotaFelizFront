import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'mascota-feliz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  fgValidador: FormGroup = this.fb.group({});

  modalRef2?: BsModalRef;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: SeguridadService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
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
        this.router.navigateByUrl('/configuracion/dashboard');

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

  onCargarResetPassword() {
    let initialState = {};
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.modalRef2 = this.modalService.show(
      ResetPasswordComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.modalRef2.content.closeBtnName = 'Cancelar';

    if (!this.bsModalRef) {
      return;
    }

    this.bsModalRef.hide();
  }
}
