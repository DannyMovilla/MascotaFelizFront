import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  formValidator: FormGroup = this.fb.group({});

  constructor(
    private prospectosServices: ProspectosService,
    private fb: FormBuilder,
    private authServices: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
   // this.cerrarSession();
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
              'Información ha sido almacenada correctamente',
              'success'
            );
            console.log('Almacenado correctamente');
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

  cerrarSession() {
    this.authServices.eliminarSession();
    this.router.navigateByUrl('/inicio');
  }
}
