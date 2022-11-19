import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from 'src/app/modelos/producto-servicio.model';

const jsPDF = require('jspdf');

import html2canvas from 'html2canvas';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';
import { InfoProductosComponent } from '../info-productos/info-productos.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'mascota-feliz-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent implements OnInit {
  modeloData: ProductoServicio[] = [];
  modeloDataAux: ProductoServicio[] = [];
  modeloCategoria: string[] = ['PRODUCTO', 'SERVICIO'];

  bsModalRef?: BsModalRef;
  dataSesion: any;

  fgValidador: FormGroup = this.fb.group({
    nombre: [''],
    tipo: [''],
  });

  constructor(
    private fb: FormBuilder,
    private productoServices: ProductoServicioService,
    private modalService: BsModalService,
    private authServices: SeguridadService
  ) {}

  ngOnInit(): void {
    this.dataSesion = this.authServices.obtenerSession();
    this.buscar();
  }

  buscar() {
    let filtro = new ProductoServicio(this.fgValidador.value);

    this.productoServices.getProductoServicio(filtro).subscribe({
      next: (data: ProductoServicio[]) => {
        this.modeloData = data;
        this.modeloDataAux = data;
      },
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.modeloData = this.modeloDataAux.slice(startItem, endItem);
    window.scrollTo(0, 0);
  }

  onGestionar(idProducto: any) {
    var dataObject = {};
    let initialState = {
      idProducto: idProducto,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      InfoProductosComponent,
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
      InfoProductosComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose = () => {
      this.buscar();
    };
  }

  onEliminar(idProducto: string) {
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
        this.productoServices.deleteProductoServicio(idProducto).subscribe(
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

  // tslint:disable-next-line:typedef
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA!, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_Productos.pdf`);
      });
  }
}
