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
  id: string = '';

  fgValidador: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private rolServices: RolService,
    public dialogRef: MatDialogRef<InfoRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.initForm();
  }

  initForm() {
    this.fgValidador = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    });
  }

  onRegistrar() {
    let rolData = new Rol(this.fgValidador.value);

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
  }
}
