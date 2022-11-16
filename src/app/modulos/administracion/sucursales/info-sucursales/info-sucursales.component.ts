import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Sucursal } from 'src/app/modelos/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-sucursales',
  templateUrl: './info-sucursales.component.html',
  styleUrls: ['./info-sucursales.component.css'],
})
export class InfoSucursalesComponent implements OnInit {
  idSucursal?: string | undefined;
  onClose: any;

  fgValidador: FormGroup = this.fb.group({
    id: [''],
    departamento: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private sucursalServices: SucursalService
  ) {}

  ngOnInit(): void {
    if (typeof this.idSucursal != 'undefined') {
      this.obtenerObjecto();
    }
  }

  obtenerObjecto() {
    this.sucursalServices.getSucursalById(this.idSucursal!).subscribe({
      next: (data) => {
        this.fgValidador.controls['id'].setValue(this.idSucursal);
        this.fgValidador.controls['departamento'].setValue(data.departamento);
        this.fgValidador.controls['ciudad'].setValue(data.ciudad);
        this.fgValidador.controls['direccion'].setValue(data.direccion);
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }

  onRegistrar() {
    let sucursalData = new Sucursal(this.fgValidador.value);
    delete sucursalData.id;

    if (typeof this.idSucursal == 'undefined') {
      this.sucursalServices.newSucursal(sucursalData).subscribe(
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
      this.sucursalServices
        .updateSucursal(this.idSucursal!, sucursalData)
        .subscribe(
          (datos: any) => {
            Swal.fire(
              'Mascota Feliz!',
              'La sucursal fue actualizada correctamente',
              'success'
            );

            this.bsModalRef?.hide();
          },
          (error: any) => {
            console.log(error);

            Swal.fire(
              'Mascota Feliz!',
              'Error al actualizada la información',
              'warning'
            );
          }
        );
    }
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
}
