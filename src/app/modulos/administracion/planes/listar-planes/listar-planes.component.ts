import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Plan } from 'src/app/modelos/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';
import { InfoPlanComponent } from '../info-plan/info-plan.component';

@Component({
  selector: 'mascota-feliz-listar-planes',
  templateUrl: './listar-planes.component.html',
  styleUrls: ['./listar-planes.component.css'],
})
export class ListarPlanesComponent implements OnInit {
  modeloData: Plan[] = [];
  bsModalRef?: BsModalRef;
  constructor(
    private planServices: PlanService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.planServices.getPlan().subscribe({
      next: (data: Plan[]) => {
        this.modeloData = data;
      },
    });
  }

  onGestionar(idPlan: any) {
    var dataObject = {};
    let initialState = {
      idPlan: idPlan,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      InfoPlanComponent,
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
      InfoPlanComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose = () => {
      this.buscar();
    };
  }

  onEliminar(idPlan: string) {
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
        this.planServices.deletePlan(idPlan).subscribe(
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
