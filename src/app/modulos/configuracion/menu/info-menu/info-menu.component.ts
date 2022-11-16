import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MenuRol } from 'src/app/modelos/menu-rol.model';
import { Rol } from 'src/app/modelos/rol.model';
import { MenuRolService } from 'src/app/services/menu-rol.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.css']
})
export class InfoMenuComponent implements OnInit {
  modeloRoles: Rol[] = [];
  idMenuRol?: string | undefined;
  onClose: any;

  fgValidador: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    url: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private rolServices: RolService,
    private menuServices: MenuRolService
  ) {}

  ngOnInit(): void {
    this.obtenerObjecto();
  }

  obtenerObjecto() {
    this.rolServices.getRols().subscribe({
      next: (data: Rol[]) => {
        this.modeloRoles = data;
      },
    });

    if (typeof this.idMenuRol != 'undefined') {
      this.menuServices.getMenuRolById(this.idMenuRol).subscribe({
        next: (dataUsario) => {
          this.fgValidador.controls['id'].setValue(this.idMenuRol);
          this.fgValidador.controls['nombre'].setValue(dataUsario.nombre);
          this.fgValidador.controls['url'].setValue(dataUsario.url);
          this.fgValidador.controls['rol'].setValue(dataUsario.rol);
        },
        error: (err) => {
          console.log('Problemas en la comunicación con el servidor');
        },
      });
    }
  }


  onRegistrar() {
    let menuRolData = new MenuRol(this.fgValidador.value);
    delete menuRolData.id;

    if (typeof this.idMenuRol == 'undefined') {
      this.menuServices.newMenuRol(menuRolData).subscribe(
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
      this.menuServices.updateMenuRol(this.idMenuRol!, menuRolData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El menu fue actualizado correctamente',
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

  get nombreNoValido() {
    return (
      this.fgValidador.get('nombre')?.invalid &&
      (this.fgValidador.get('nombre')?.dirty ||
        this.fgValidador.get('nombre')?.touched)
    );
  }

  get urlNoValido() {
    return (
      this.fgValidador.get('url')?.invalid &&
      (this.fgValidador.get('url')?.dirty ||
        this.fgValidador.get('url')?.touched)
    );
  }

  get rolNoValido() {
    return (
      this.fgValidador.get('rol')?.invalid &&
      (this.fgValidador.get('rol')?.dirty ||
        this.fgValidador.get('rol')?.touched)
    );
  }

}
