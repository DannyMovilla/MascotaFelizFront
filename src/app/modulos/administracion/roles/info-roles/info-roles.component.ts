import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Rol } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-roles',
  templateUrl: './info-roles.component.html',
  styleUrls: ['./info-roles.component.css'],
})
export class InfoRolesComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private rolServices: RolService,
    public dialogRef: MatDialogRef<InfoRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    if (this.data != null) {
      this.obtenerObjecto();
    }
  }

  obtenerObjecto() {
    this.rolServices.getRolById(this.data).subscribe({
      next: (data) => {
        this.fgValidador.controls['id'].setValue(this.data);
        this.fgValidador.controls['nombre'].setValue(data.nombre);
        this.fgValidador.controls['codigo'].setValue(data.codigo);
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }

  get nombreNoValido() {
    return (
      this.fgValidador.get('nombre')?.invalid &&
      (this.fgValidador.get('nombre')?.dirty ||
        this.fgValidador.get('nombre')?.touched)
    );
  }

  get codigoNoValido() {
    return (
      this.fgValidador.get('codigo')?.invalid &&
      (this.fgValidador.get('codigo')?.dirty ||
        this.fgValidador.get('codigo')?.touched)
    );
  }

  onRegistrar() {
    let rolData = new Rol(this.fgValidador.value);

    if (this.data == null) {
      delete rolData.id;

      this.rolServices.newRol(rolData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El rol fue guardado correctamente',
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
      this.rolServices.updateRol(rolData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El rol fue guardado correctamente',
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
}
