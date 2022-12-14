import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Rol } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { InfoRolComponent } from '../info-rol/info-rol.component';

@Component({
  selector: 'mascota-feliz-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css'],
})
export class ListarRolesComponent implements OnInit {
  modeloData: Rol[] = [];
  bsModalRef?: BsModalRef;

  fgValidador: FormGroup = this.fb.group({
    nombre: [''],
    codigo: [''],
  })

  constructor(
    private fb: FormBuilder,
    private rolServices: RolService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    let filtro = new Rol(this.fgValidador.value);

    this.rolServices.getRols(filtro).subscribe({
      next: (data: Rol[]) => {
        this.modeloData = data;
      },
    });
  }

  onGestionar(idRol: any) {
    var dataObject = {};
    let initialState = {
      idRol: idRol,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      InfoRolComponent,
      Object.assign(dataObject, modalConfig, {
        class: 'modal-sm',
        initialState,
      })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose = () => {
      this.buscar();
    };
  }

  onCargar() {
    let initialState = {};
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      InfoRolComponent,
      Object.assign({}, modalConfig, { class: 'modal-sm', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose = () => {
      this.buscar();
    };
  }

  onEliminar(idRol: string) {
    Swal.fire({
      title: 'Atenci??n',
      text: 'Est?? seguro que desea eliminar la informaci??n seleccionada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolServices.deleteRol(idRol).subscribe(
          (datos: any) => {
            Swal.fire(
              'Mascota Feliz!',
              'La informaci??n ha sido eliminada correctamente.',
              'success'
            );

            this.buscar();
          },
          (error: any) => {
            console.log(error);

            Swal.fire(
              'Mascota Feliz!',
              'Error al eliminar la informaci??n',
              'warning'
            );
          }
        );
      }
    });
  }
}
