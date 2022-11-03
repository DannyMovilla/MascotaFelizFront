import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Rol } from 'src/app/modelos/rol.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css'],
})
export class InfoUsuarioComponent implements OnInit {
  modeloRoles: Rol[] = [];
  idUsuario?: string | undefined;
  onClose: any;

  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    documento: ['', [Validators.required]],
    foto: ['', [Validators.required]],
    rolId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private rolServices: RolService,
    private usuarioServices: UsuarioService
  ) {}

  InitSelect: any;

  ngOnInit(): void {
    this.obtenerObjecto();
  }

  obtenerObjecto() {
    this.rolServices.getRols().subscribe({
      next: (data: Rol[]) => {
        this.modeloRoles = data;
      },
    });

    if (typeof this.idUsuario != 'undefined') {
      this.usuarioServices.getUsuarioById(this.idUsuario).subscribe({
        next: (dataUsario) => {
          this.fgValidador.controls['id'].setValue(this.idUsuario);
          this.fgValidador.controls['nombres'].setValue(dataUsario.nombres);
          this.fgValidador.controls['apellidos'].setValue(dataUsario.apellidos);
          this.fgValidador.controls['correo'].setValue(dataUsario.correo);
          this.fgValidador.controls['documento'].setValue(dataUsario.documento);
          this.fgValidador.controls['foto'].setValue(dataUsario.foto);
          this.fgValidador.controls['rolId'].setValue(dataUsario.rolId);
        },
        error: (err) => {
          console.log('Problemas en la comunicación con el servidor');
        },
      });
    }
  }

  onRegistrar() {
    let usuarioData = new Usuario(this.fgValidador.value);
    delete usuarioData.id;

    if (typeof this.idUsuario == 'undefined') {
      this.usuarioServices.newUsuario(usuarioData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El usuario fue guardado correctamente',
            'success'
          );

          this.onClose();
          this.bsModalRef?.hide();
        },
        (error: any) => {
          console.log(error);

          Swal.fire(
            'Mascota Feliz!',
            'Error al guardar la información',
            'warning'
          );
        }
      );
    } else {
      this.usuarioServices.updateUsuarioPatch(this.idUsuario, usuarioData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El usuario fue actualizado correctamente',
            'success'
          );

          this.onClose();
          this.bsModalRef?.hide();
        },
        (error: any) => {
          console.log(error);

          Swal.fire(
            'Mascota Feliz!',
            'Error al actualizar la información',
            'warning'
          );
        }
      );
    }
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
