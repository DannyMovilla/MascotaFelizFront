import { Component, OnInit } from '@angular/core';
import { Prospectos } from 'src/app/modelos/prospectos.model';
import { ProspectosService } from 'src/app/services/prospectos.service';

const jsPDF = require('jspdf');
import html2canvas from 'html2canvas';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MailComponent } from '../mail/mail.component';

@Component({
  selector: 'mascota-feliz-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.css'],
})
export class ProspectosComponent implements OnInit {
  modeloData: Prospectos[] = [];

  bsModalRef?: BsModalRef;

  constructor(
    private prospectosServices: ProspectosService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    this.prospectosServices.getProspectos().subscribe(
      (resp: Prospectos[]) => {
        this.modeloData = resp;
      },
      (errorServicio) => {}
    );
  }

  onResponder(to: string) {
    var dataObject = {};
    let initialState = {
      to: to,
    };
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      MailComponent,
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
        docResult.save(`${new Date().toISOString()}_Prospectos.pdf`);
      });
  }
}
