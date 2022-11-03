import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuRol } from 'src/app/modelos/menu-rol.model';
import { MenuRolService } from 'src/app/services/menu-rol.service';
import Swal from 'sweetalert2';
import { InfoMenuComponent } from '../info-menu/info-menu.component';

@Component({
  selector: 'mascota-feliz-listar-menu',
  templateUrl: './listar-menu.component.html',
  styleUrls: ['./listar-menu.component.css'],
})
export class ListarMenuComponent implements OnInit {
  modeloData: MenuRol[] = [];
  bsModalRef?: BsModalRef;

  constructor(
    private menuRolServices: MenuRolService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.menuRolServices.getMenuRol().subscribe({
      next: (data: MenuRol[]) => {
        this.modeloData = data;
      },
    });
  }

  onGestionar(idMenuRol: any) {
    var dataObject = {};
    let initialState = {
      idMenuRol: idMenuRol,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      InfoMenuComponent,
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
      InfoMenuComponent,
      Object.assign({}, modalConfig, { class: 'modal-sm', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose = () => {
      this.buscar();
    };
  }

  onEliminar(idMenuRol: string) {
    Swal.fire({
      title: 'Atención',
      text: 'Está seguro que desea eliminar la información seleccionada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuRolServices.deleteMenuRol(idMenuRol).subscribe(
          (datos: any) => {
            Swal.fire(
              'Mascota Feliz!',
              'La información ha sido eliminada correctamente.',
              'success'
            );

            this.buscar();
          },
          (error: any) => {
            console.log(error);

            Swal.fire(
              'Mascota Feliz!',
              'Error al eliminar la información',
              'warning'
            );
          }
        );
      }
    });
  }
}
