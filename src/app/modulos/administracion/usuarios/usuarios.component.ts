import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Rol } from 'src/app/modelos/rol.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { InfoUsuarioComponent } from './info-usuario/info-usuario.component';

@Component({
  selector: 'mascota-feliz-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  modeloData: Usuario[] = [];
  modeloRoles: Rol[] = [];
  bsModalRef?: BsModalRef;

  fgValidador: FormGroup = this.fb.group({
    correo: ['', [Validators.email]],
    documento: ['']
  })

  constructor(
    private fb: FormBuilder,
    private usuarioServices: UsuarioService,
    private rolServices: RolService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.rolServices.getRols().subscribe({
      next: (data: Rol[]) => {
        this.modeloRoles = data;
      },
    });

    let filtro = new Usuario(this.fgValidador.value);
    this.usuarioServices.getUsuarios(filtro).subscribe(
      (resp: Usuario[]) => {
        this.modeloData = resp;
      },
      (errorServicio) => {}
    );
  }

  onGestionar(idUsuario: any) {
    var dataObject = {};
    let initialState = {
      idUsuario: idUsuario,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      InfoUsuarioComponent,
      Object.assign(dataObject, modalConfig, {
        class: 'modal-md',
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
      InfoUsuarioComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose = () => {
      this.buscar();
    };
  }

  onEliminar(idUsuario: string) {
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
        this.usuarioServices.deleteUsuario(idUsuario).subscribe(
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
