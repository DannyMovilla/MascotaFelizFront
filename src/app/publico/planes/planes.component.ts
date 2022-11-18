import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Plan } from 'src/app/modelos/plan.model';
import { RegistrarComponent } from 'src/app/modulos/seguridad/registrar/registrar.component';
import { PlanService } from 'src/app/services/plan.service';
import AOS from "aos";

@Component({
  selector: 'mascota-feliz-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {
  modeloData: Plan[] = [];
  bsModalRef?: BsModalRef;

  constructor(
    private planServices: PlanService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.planServices.getPlan().subscribe({
      next: (data) => {
        this.modeloData = data;
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });

    AOS.init();

  }

  onCargarRegistrar() {
    let initialState = {};
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      RegistrarComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }
}
