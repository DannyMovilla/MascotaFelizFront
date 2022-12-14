import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/modelos/rol.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { RolService } from 'src/app/services/rol.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  modeloRoles: Rol[] = [];

  fgValidador: FormGroup = this.fb.group({
    id: [''],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    rolId: ['', [Validators.required]],
  });

  id: string = '';

  constructor(
    private fb: FormBuilder,
    private rolServices: RolService,
    private usuarioServices: UsuarioService,
    private authServices: SeguridadService
  ) {}

  ngOnInit(): void {
    this.id = this.authServices.obtenerSession().datos.id;
    this.obtenerObjecto();
  }

  obtenerObjecto() {
    this.rolServices.getRols().subscribe({
      next: (data: Rol[]) => {
        this.modeloRoles = data;
      },
    });

    if (this.id != null) {
      this.usuarioServices.getUsuarioById(this.id).subscribe({
        next: (dataUsario) => {
          this.fgValidador.controls['id'].setValue(this.id);
          this.fgValidador.controls['nombres'].setValue(dataUsario.nombres);
          this.fgValidador.controls['apellidos'].setValue(dataUsario.apellidos);
          this.fgValidador.controls['correo'].setValue(dataUsario.correo);
          this.fgValidador.controls['documento'].setValue(dataUsario.documento);
          this.fgValidador.controls['rolId'].setValue(dataUsario.rolId);
        },
        error: (err) => {
          console.log('Problemas en la comunicaci??n con el servidor');
        },
      });
    }
  }

  onRegistrar() {
    let usuarioData = new Usuario(this.fgValidador.value);
    delete usuarioData.contrasena;

    this.usuarioServices.updateUsuarioPatch(usuarioData.id!, usuarioData).subscribe(
      (datos: any) => {
        Swal.fire(
          'Mascota Feliz!',
          'El usuario fue guardado correctamente',
          'success'
        );
      },
      (error: any) => {
        console.log(error);

        Swal.fire(
          'Mascota Feliz!',
          'Error al guardar la informaci??n',
          'warning'
        );
      }
    );
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
