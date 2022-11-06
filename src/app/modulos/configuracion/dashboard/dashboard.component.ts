import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Plan } from 'src/app/modelos/plan.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { PlanService } from 'src/app/services/plan.service';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'mascota-feliz-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataCounter: any[] = [];
  dataBarra: any[] = [];
  view: any[] = [850, 200];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Planes';
  showYAxisLabel = true;
  yAxisLabel = 'Afiliaciones';
  /*colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };*/

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  cardColor: string = '#232837';

  constructor(
    private prospectoServices: ProspectosService,
    private mascotasServices: MascotaService,
    private usuarioServices: UsuarioService,
    private surcursalServices: SucursalService,
    private planServices: PlanService,
    private authServices: SeguridadService
  ) {
    this.view = [innerWidth / 2, 250];
  }

  ngOnInit(): void {
    this.grafiContar();
    this.grafiBarra();
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
            name: 'Afiliaciones',
            value: mascota['count'],
          },
          {
            name: 'Usuario',
            value: usuario['count'],
          },
          {
            name: 'Sucursales',
            value: sucursal['count'],
          },
        ];

        if(this.authServices.obtenerRolSesion() != 'ADMIN'){
          for (let index = 0; index < this.dataCounter.length; index++) {
            const element = this.dataCounter[index];

            if(element.name == 'Usuario'){
              this.dataCounter.splice(index,1);
              break
            }

          }
        }
      },
      (errorServicio) => {
        console.log(errorServicio);
      }
    );
  }

  grafiBarra() {
    this.planServices.getPlan().subscribe((data: Plan[]) => {
      let dato: any[] = [];
      for (let index = 0; index < data.length; index++) {
        const dataPlan = data[index];

        let datos = {
          name: dataPlan.nombre,
          value:
            typeof dataPlan.mascotas == 'undefined'
              ? 0
              : dataPlan.mascotas.length,
        };
        dato.push(datos);
      }
      this.dataBarra = dato;
    });
  }

  onSelect(event: any) {
    console.log(event);
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 2, 250];
  }
}
