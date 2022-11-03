import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mascota } from 'src/app/modelos/mascota.model';
import { Plan } from 'src/app/modelos/plan.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { PlanService } from 'src/app/services/plan.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { InfoAfiliacionComponent } from '../info-afiliacion/info-afiliacion.component';

@Component({
  selector: 'mascota-feliz-listar-afiliaciones',
  templateUrl: './listar-afiliaciones.component.html',
  styleUrls: ['./listar-afiliaciones.component.css'],
})
export class ListarAfiliacionesComponent implements OnInit {
  modeloData: Mascota[] = [];
  modeloUsuarios: Usuario[] = [];
  modeloPlans: Plan[] = [];
  bsModalRef?: BsModalRef;

  constructor(
    private mascotaServices: MascotaService,
    private planServices: PlanService,
    private usuarioServices: UsuarioService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.mascotaServices.getMascota().subscribe({
      next: (data: Mascota[]) => {
        this.modeloData = data;
      },
    });

    this.planServices.getPlan().subscribe({
      next: (data: Plan[]) => {
        this.modeloPlans = data;
      },
    });

    this.usuarioServices.getUsuarios().subscribe(
      (resp: Usuario[]) => {
        this.modeloUsuarios = resp;
      },
      (errorServicio) => {}
    );
  }

  onGestionar(idMascota: any) {
    var dataObject = {};
    let initialState = {
      idMascota: idMascota,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      InfoAfiliacionComponent,
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
      InfoAfiliacionComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose = () => {
      this.buscar();
    };
  }

  onEliminar(idMascota: string) {
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
        this.mascotaServices.deleteMascota(idMascota).subscribe(
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