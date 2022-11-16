import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Rol } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-rol',
  templateUrl: './info-rol.component.html',
  styleUrls: ['./info-rol.component.css'],
})
export class InfoRolComponent implements OnInit {
  idRol?: string | undefined;
  onClose: any;

  fgValidador: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private rolServices: RolService
  ) {}

  ngOnInit(): void {
    if (typeof this.idRol != 'undefined') {
      this.obtenerObjecto();
    }
  }

  obtenerObjecto() {
    this.rolServices.getRolById(this.idRol!).subscribe({
      next: (data) => {
        this.fgValidador.controls['id'].setValue(this.idRol);
        this.fgValidador.controls['nombre'].setValue(data.nombre);
        this.fgValidador.controls['codigo'].setValue(data.codigo);
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }
  onRegistrar() {
    let rolData = new Rol(this.fgValidador.value);
    delete rolData.id;

    if (typeof this.idRol == 'undefined') {
      this.rolServices.newRol(rolData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El rol fue guardado correctamente',
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
      this.rolServices.updateRol(this.idRol!, rolData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El rol fue guardado correctamente',
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
    }
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
}
