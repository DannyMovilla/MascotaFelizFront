import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { combineLatest } from 'rxjs';
import { Rol } from 'src/app/modelos/rol.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-usuarios',
  templateUrl: './info-usuarios.component.html',
  styleUrls: ['./info-usuarios.component.css'],
})
export class InfoUsuariosComponent implements OnInit {
  modeloRoles: Rol[] = [];

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
    private usuarioServices: UsuarioService,
    public dialogRef: MatDialogRef<InfoUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  InitSelect: any;

  ngOnInit(): void {
    this.obtenerObjecto();
  }

  obtenerObjecto() {
    this.rolServices.getRols().subscribe({
      next: (data: Rol[]) => {
        this.modeloRoles = data;
        setTimeout(() => {
          this.InitSelect('selectorRol');
        }, 100);
      },
    });

    if (this.data != null) {
      this.usuarioServices.getUsuarioById(this.data).subscribe({
        next: (dataUsario) => {
          this.fgValidador.controls['id'].setValue(this.data);
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

    if (this.data == null) {
      delete usuarioData.id;

      this.usuarioServices.newUsuario(usuarioData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El usuario fue guardado correctamente',
            'success'
          );

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
      this.usuarioServices.updateUsuario(usuarioData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El usuario fue guardado correctamente',
            'success'
          );

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