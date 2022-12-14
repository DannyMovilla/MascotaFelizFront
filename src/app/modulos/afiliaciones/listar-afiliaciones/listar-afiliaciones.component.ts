import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mascota } from 'src/app/modelos/mascota.model';
import { Plan } from 'src/app/modelos/plan.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { PlanService } from 'src/app/services/plan.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { EstadoAfiliacionComponent } from '../estado-afiliacion/estado-afiliacion.component';
import { InfoAfiliacionComponent } from '../info-afiliacion/info-afiliacion.component';

const jsPDF = require('jspdf');

import html2canvas from 'html2canvas';

@Component({
  selector: 'mascota-feliz-listar-afiliaciones',
  templateUrl: './listar-afiliaciones.component.html',
  styleUrls: ['./listar-afiliaciones.component.css'],
})
export class ListarAfiliacionesComponent implements OnInit {
  modeloData: Mascota[] = [];
  modeloUsuarios: Usuario[] = [];
  modeloPlans: Plan[] = [];
  modeloEstado: string[] = ['PENDIENTE', 'ACEPTADO', 'RECHAZADO'];

  bsModalRef?: BsModalRef;
  dataSesion: any;

  fgValidador: FormGroup = this.fb.group({
    nombre: [''],
    estado: [''],
  })

  constructor(
    private fb: FormBuilder,
    private mascotaServices: MascotaService,
    private planServices: PlanService,
    private usuarioServices: UsuarioService,
    private modalService: BsModalService,
    private authServices: SeguridadService
  ) {}

  ngOnInit(): void {
    this.dataSesion = this.authServices.obtenerSession();
    this.buscar();
  }

  buscar() {
    let filtro = new Mascota(this.fgValidador.value);

    if (this.dataSesion.rolUsuario.codigo != 'CLIENTE') {
      this.mascotaServices.getMascota(filtro).subscribe({
        next: (data: Mascota[]) => {
          this.modeloData = data;
        },
      });
    } else {
      this.mascotaServices
        .getMascotaCliente(this.dataSesion.datos.id, filtro)
        .subscribe({
          next: (data: Mascota[]) => {
            this.modeloData = data;
          },
        });
    }

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

  onEstados(idMascota: any) {
    var dataObject = {};
    let initialState = {
      idMascota: idMascota,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      EstadoAfiliacionComponent,
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
      title: 'Atenci??n',
      text: 'Est?? seguro que desea eliminar la informaci??n seleccionada?',
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

  // tslint:disable-next-line:typedef
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_Afiliaciones.pdf`);
    });
  }
}
