import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Sucursal } from 'src/app/modelos/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'mascota-feliz-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css'],
})
export class SucursalesComponent implements OnInit {
  modeloData: Sucursal[] = [];
  bsModalRef?: BsModalRef;

  constructor(
    private sucursalServices: SucursalService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.sucursalServices.getSucursal().subscribe({
      next: (data) => {
        this.modeloData = data;
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }
}
