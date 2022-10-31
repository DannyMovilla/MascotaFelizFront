import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
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
    });
  }

  onIngresar() {
    let usuario = this.fgValidador.controls['usuario'].value;

    this.authService.resetPassword(usuario).subscribe(
      (datos: any) => {
        Swal.fire(
          'Mascota Feliz!',
          'Te hemos enviado un correo para tú nueva contraseña',
          'success'
        );
        this.bsModalRef?.hide();
      },
      (error: any) => {
        console.log(error);

        Swal.fire('Mascota Feliz!', 'Usuario no encontrado', 'warning');
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
}
