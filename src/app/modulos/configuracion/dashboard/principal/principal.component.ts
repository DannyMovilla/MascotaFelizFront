import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Prospectos } from 'src/app/modelos/prospectos.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'mascota-feliz-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  dataCounter: any[] = [];
  view: any[] = [700, 150];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  cardColor: string = '#232837';

  constructor(
    private prospectoServices: ProspectosService,
    private mascotasServices: MascotaService,
    private usuarioServices: UsuarioService,
    private surcursalServices: SucursalService
  ) {}

  ngOnInit(): void {
    this.grafiContar();
  }

  grafiContar() {
    const observables = [];
    observables.push(this.prospectoServices.getProspectosCount());
    observables.push(this.mascotasServices.getMascotaCount());
    observables.push(this.usuarioServices.getUsuarioCount());
    observables.push(this.surcursalServices.getSucursalCount());

    combineLatest(observables).subscribe(
      ([prospecto, mascota, usuario, sucursal]) => {
        this.dataCounter = [
          {
            name: 'Prospectos',
            value: prospecto['count'],
          },
          {
            name: 'Mascotas',
            value: mascota['count'],
          },
          {
            name: 'Usuario',
            value: usuario['count'],
          },
          {
            name: 'Sucursal',
            value: sucursal['count'],
          }
        ];

      },
      (errorServicio) => {
        console.log(errorServicio);
      }
    );
  }

  onSelect(event: any) {
    console.log(event);
  }
}
