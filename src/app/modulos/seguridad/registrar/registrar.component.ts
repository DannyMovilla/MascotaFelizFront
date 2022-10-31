import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modelos/usuario.model';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit, OnDestroy {
  fgValidador: FormGroup = this.fb.group({});
  idRolCliente?: String = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioServicio: UsuarioService,
    private rolServices: RolService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolServices.getRols().subscribe({
      next: (data) => {
        for (let index = 0; index < data.length; index++) {
          const dataRol = data[index];
          if (dataRol.codigo == 'CLIENTE') {
            this.idRolCliente = dataRol.id;
          }
        }
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }

  initForm() {
    this.fgValidador = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      documento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {}

  onRegistrar() {
    let modelUsuario = new Usuario(this.fgValidador.value);

    if (typeof this.idRolCliente != 'undefined') {
      modelUsuario.rolId = String(this.idRolCliente);
    }

    this.usuarioServicio.newUsuario(modelUsuario).subscribe({
      next: (data) => {
        if (data) {
          Swal.fire(
            'Bienvenido a Mascota Feliz!',
            'Usted recibirá un correo con mayor información.',
            'success'
          );
          console.log('Almacenado correctamente');
        } else {
          console.log('Error almacenando');
        }
      },
    });

    this.router.navigateByUrl('/inicio');
  }

  get correoNoValido() {
    return (
      this.fgValidador.get('correo')?.invalid &&
      (this.fgValidador.get('correo')?.dirty ||
        this.fgValidador.get('correo')?.touched)
    );
  }

  get documentoNoValido() {
    return (
      this.fgValidador.get('documento')?.invalid &&
      (this.fgValidador.get('documento')?.dirty ||
        this.fgValidador.get('documento')?.touched)
    );
  }

  get nombresNoValido() {
    return (
      this.fgValidador.get('nombres')?.invalid &&
      (this.fgValidador.get('nombres')?.dirty ||
        this.fgValidador.get('nombres')?.touched)
    );
  }

  get apellidosNoValido() {
    return (
      this.fgValidador.get('apellidos')?.invalid &&
      (this.fgValidador.get('apellidos')?.dirty ||
        this.fgValidador.get('apellidos')?.touched)
    );
  }

}
