import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Mascota } from 'src/app/modelos/mascota.model';
import { MascotaService } from 'src/app/services/mascota.service';
import { PlanService } from 'src/app/services/plan.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-estado-afiliacion',
  templateUrl: './estado-afiliacion.component.html',
  styleUrls: ['./estado-afiliacion.component.css'],
})
export class EstadoAfiliacionComponent implements OnInit {
  modeloEstado: string[] = ['PENDIENTE', 'ACEPTADO', 'RECHAZADO'];

  idMascota?: string | undefined;
  idUsuaro?: string | undefined;
  rolSesion: string = '';
  dataSesion: any;
  modeloMascota: Mascota = new Mascota();

  onClose: any;

  fgValidador: FormGroup = this.fb.group({
    id: [''],
    estado: ['PENDIENTE', [Validators.required]],
    detalle: ['', [Validators.required]],
    fechaAfiliacion: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private planServices: PlanService,
    private mascotaServices: MascotaService,
    private authServices: SeguridadService
  ) {}

  ngOnInit(): void {
    this.dataSesion = this.authServices.obtenerSession();
    this.rolSesion = this.dataSesion.rolUsuario.codigo;
    this.obtenerObjecto();
  }

  obtenerObjecto() {
    if (this.idMascota != null) {
      this.mascotaServices.getMascotaById(this.idMascota).subscribe({
        next: (dataUsario) => {
          this.modeloMascota = dataUsario;
          this.fgValidador.controls['id'].setValue(this.idMascota);
          this.fgValidador.controls['estado'].setValue(dataUsario.estado);
          this.fgValidador.controls['detalle'].setValue(dataUsario.detalle);
          this.fgValidador.controls['fechaAfiliacion'].setValue(
            dataUsario.fechaAfiliacion
          );
        },
        error: (err) => {
          console.log('Problemas en la comunicación con el servidor');
        },
      });
    }
  }

  onRegistrar() {
    let mascotaData = new Mascota(this.fgValidador.value);
    delete mascotaData.id;

    if(mascotaData.estado == 'PENDIENTE'){
      mascotaData.detalle = "";
    }

    if (this.idMascota == null) {
      Swal.fire(
        'Mascota Feliz!',
        'Debe seleccionar una afiliación para que sea procesada',
        'success'
      );
    } else {
      if(mascotaData.estado == 'ACEPTADO'){
        let pipe = new DatePipe('en-US');
        mascotaData.fechaAfiliacion = pipe.transform(Date.now(), 'dd/MM/yyyy')!;
        mascotaData.detalle = "";
      }

      this.mascotaServices.updateEstadoMascota(this.idMascota, mascotaData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El estado de la afiliación fue actualizada correctamente',
            'success'
          );

          this.onClose();
          this.bsModalRef?.hide();
        },
        (error: any) => {
          console.log(error);

          Swal.fire(
            'Mascota Feliz!',
            'Error al actualizar la información',
            'warning'
          );
        }
      );
    }
  }

  get estadoNoValido() {
    return (
      this.fgValidador.get('estado')?.invalid &&
      (this.fgValidador.get('estado')?.dirty ||
        this.fgValidador.get('estado')?.touched)
    );
  }

  get detalleNoValido() {
    return (
      this.fgValidador.get('detalle')?.invalid &&
      (this.fgValidador.get('detalle')?.dirty ||
        this.fgValidador.get('detalle')?.touched)
    );
  }

  get estadoValido() {
    return this.fgValidador.get('estado')?.value;
  }
}
