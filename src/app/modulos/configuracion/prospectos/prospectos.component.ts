import { Component, OnInit } from '@angular/core';
import { Prospectos } from 'src/app/modelos/prospectos.model';
import { ProspectosService } from 'src/app/services/prospectos.service';

@Component({
  selector: 'mascota-feliz-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.css'],
})
export class ProspectosComponent implements OnInit {
  modeloData: Prospectos[] = [];

  constructor(private prospectosServices: ProspectosService) {}

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
}
