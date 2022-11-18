import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';
import AOS from 'aos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/modulos/seguridad/login/login.component';
import { RegistrarComponent } from 'src/app/modulos/seguridad/registrar/registrar.component';

@Component({
  selector: 'mascota-feliz-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  formValidator: FormGroup = this.fb.group({});

  bsModalRef?: BsModalRef;

  constructor(
    private prospectosServices: ProspectosService,
    private fb: FormBuilder,
    private authServices: SeguridadService,
    private router: Router,
    private modalService: BsModalService
  ) {
    if (this.authServices.obtenerSession()) {
      this.router.navigate(['/configuracion/dashboard']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    AOS.init();
  }

  initForm() {
    this.formValidator = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      mensaje: ['', [Validators.required]],
    });
  }

  guardarProspecto() {
    if (this.formValidator.invalid) {
      console.log('Formulario inválido');
    } else {
      let nombre = this.getForm['nombre'].value;
      let correo = this.getForm['correo'].value;
      let mensaje = this.getForm['mensaje'].value;
      let modelProspecto = {
        nombres: nombre,
        correo: correo,
        mensaje: mensaje,
      };
      this.prospectosServices.newProspecto(modelProspecto).subscribe({
        next: (data) => {
          if (data) {
            Swal.fire(
              'Mascota Feliz!',
              'Gracias por dejarnos tú contacto, un asesor pronto se comunicará con usted.',
              'success'
            );
            this.initForm();
          } else {
            console.log('Error almacenando');
            Swal.fire(
              'Mascota Feliz!',
              'Error al guardar la información',
              'error'
            );
          }
        },
      });
    }
  }

  onCargarLogin() {
    let initialState = {};
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      LoginComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }

  onCargarRegistrar() {
    let initialState = {};
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      RegistrarComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }

  get getForm() {
    return this.formValidator.controls;
  }

  get nombreNoValido() {
    return (
      this.formValidator.get('nombre')?.invalid &&
      (this.formValidator.get('nombre')?.dirty ||
        this.formValidator.get('nombre')?.touched)
    );
  }

  get correoNoValido() {
    return (
      this.formValidator.get('correo')?.invalid &&
      (this.formValidator.get('correo')?.dirty ||
        this.formValidator.get('correo')?.touched)
    );
  }

  get mensajeNoValido() {
    return (
      this.formValidator.get('mensaje')?.invalid &&
      (this.formValidator.get('mensaje')?.dirty ||
        this.formValidator.get('mensaje')?.touched)
    );
  }
}
