import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Sucursal } from 'src/app/modelos/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-sucursal',
  templateUrl: './info-sucursal.component.html',
  styleUrls: ['./info-sucursal.component.css'],
})
export class InfoSucursalComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private sucursalServices: SucursalService,
    public dialogRef: MatDialogRef<InfoSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    if (this.data != null) {
      this.obtenerObjecto();
    }
  }

  obtenerObjecto() {
    this.sucursalServices.getSucursalById(this.data).subscribe({
      next: (data) => {
        this.fgValidador.controls['id'].setValue(this.data);
        this.fgValidador.controls['departamento'].setValue(data.departamento);
        this.fgValidador.controls['ciudad'].setValue(data.ciudad);
        this.fgValidador.controls['direccion'].setValue(data.direccion);
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }

  get departamentoNoValido() {
    return (
      this.fgValidador.get('departamento')?.invalid &&
      (this.fgValidador.get('departamento')?.dirty ||
        this.fgValidador.get('departamento')?.touched)
    );
  }

  get ciudadNoValido() {
    return (
      this.fgValidador.get('ciudad')?.invalid &&
      (this.fgValidador.get('ciudad')?.dirty ||
        this.fgValidador.get('ciudad')?.touched)
    );
  }

  get direccionNoValido() {
    return (
      this.fgValidador.get('direccion')?.invalid &&
      (this.fgValidador.get('direccion')?.dirty ||
        this.fgValidador.get('direccion')?.touched)
    );
  }

  onRegistrar() {
    let rolData = new Sucursal(this.fgValidador.value);

    if (this.data == null) {
      delete rolData.id;

      this.sucursalServices.newSucursal(rolData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'La sucursal fue guardada correctamente',
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
      this.sucursalServices.updateSucursal(rolData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'La sucursal fue guardada correctamente',
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
