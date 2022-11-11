import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Mascota } from 'src/app/modelos/mascota.model';
import { Plan } from 'src/app/modelos/plan.model';
import { ArchivosService } from 'src/app/services/archivos.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { PlanService } from 'src/app/services/plan.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-afiliacion',
  templateUrl: './info-afiliacion.component.html',
  styleUrls: ['./info-afiliacion.component.css'],
})
export class InfoAfiliacionComponent implements OnInit {
  modeloPlan: Plan[] = [];
  modeloEstado: string[] = ['PENDIENTE', 'ACEPTADO', 'RECHAZADO'];

  idMascota?: string | undefined;
  idUsuaro?: string | undefined;
  rolSesion: string = '';
  dataSesion: any;
  modeloMascota: Mascota = new Mascota();
  urlFotoMascota: string | undefined =
    'https://source.unsplash.com/random/276x200?sig=2&animal';

  file!: File;

  onClose: any;

  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    color: ['', [Validators.required]],
    raza: ['', [Validators.required]],
    especie: ['', [Validators.required]],
    estado: ['PENDIENTE', [Validators.required]],
    detalle: ['', [Validators.required]],
    fechaAfiliacion: ['', [Validators.required]],
    usuarioId: ['', [Validators.required]],
    planId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private planServices: PlanService,
    private mascotaServices: MascotaService,
    private authServices: SeguridadService,
    private archivoServices: ArchivosService
  ) {}

  ngOnInit(): void {
    this.dataSesion = this.authServices.obtenerSession();
    this.rolSesion = this.dataSesion.rolUsuario.codigo;
    this.fgValidador.get('estado')!.disable();
    this.fgValidador.get('detalle')!.disable();
    this.obtenerObjecto();
  }

  obtenerObjecto() {
    this.planServices.getPlan().subscribe({
      next: (data: Plan[]) => {
        this.modeloPlan = data;
      },
    });

    if (this.idMascota != null) {
      this.mascotaServices.getMascotaById(this.idMascota).subscribe({
        next: (dataUsario) => {
          this.modeloMascota = dataUsario;
          this.fgValidador.controls['id'].setValue(this.idMascota);
          this.fgValidador.controls['nombre'].setValue(dataUsario.nombre);
          this.fgValidador.controls['color'].setValue(dataUsario.color);
          this.fgValidador.controls['raza'].setValue(dataUsario.raza);
          this.fgValidador.controls['especie'].setValue(dataUsario.especie);
          this.fgValidador.controls['estado'].setValue(dataUsario.estado);
          this.fgValidador.controls['detalle'].setValue(dataUsario.detalle);
          this.fgValidador.controls['fechaAfiliacion'].setValue(
            dataUsario.fechaAfiliacion
          );
          this.fgValidador.controls['usuarioId'].setValue(dataUsario.usuarioId);
          this.fgValidador.controls['planId'].setValue(dataUsario.planId);
          this.urlFotoMascota = dataUsario.foto == null ? this.urlFotoMascota : dataUsario.foto;
        },
        error: (err) => {
          console.log('Problemas en la comunicación con el servidor');
        },
      });
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onRegistrar() {
    if (typeof this.file != 'undefined') {
      const { task, ref, path } = this.archivoServices.uploadImageToFirebase(
        this.file
      );

      task.subscribe(
        snapshot => {

        },
        (error) =>
          console.log('Some error occured while uploading the picture'),
        () =>
          ref.getDownloadURL().subscribe((downloadUrl) => {
            let mascotaData = new Mascota(this.fgValidador.value);
            mascotaData.foto = downloadUrl;
            delete mascotaData.id;

            if (this.idMascota == null) {
              mascotaData.estado = 'PENDIENTE';

              if (this.rolSesion == 'CLIENTE') {
                mascotaData.usuarioId = this.dataSesion.datos.id;
              }

              this.mascotaServices.newMascota(mascotaData).subscribe(
                (datos: any) => {
                  Swal.fire(
                    'Mascota Feliz!',
                    'La afiliación fue guardada correctamente',
                    'success'
                  );

                  this.onClose();
                  this.bsModalRef?.hide();
                },
                (error: any) => {
                  console.log(error);

                  Swal.fire(
                    'Mascota Feliz!',
                    'Error al guardar la información',
                    'warning'
                  );
                }
              );
            } else {
              mascotaData.estado = this.modeloMascota.estado;
              this.mascotaServices
                .updateMascota(this.idMascota, mascotaData)
                .subscribe(
                  (datos: any) => {
                    Swal.fire(
                      'Mascota Feliz!',
                      'La afiliación fue actualizada correctamente',
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
          })
      );
    } else {
      Swal.fire(
        'Mascota Feliz!',
        'Debe seleccionar una foto de la mascota',
        'warning'
      );
    }
  }

  get nombreNoValido() {
    return (
      this.fgValidador.get('nombre')?.invalid &&
      (this.fgValidador.get('nombre')?.dirty ||
        this.fgValidador.get('nombre')?.touched)
    );
  }
  get colorNoValido() {
    return (
      this.fgValidador.get('color')?.invalid &&
      (this.fgValidador.get('color')?.dirty ||
        this.fgValidador.get('color')?.touched)
    );
  }
  get razaNoValido() {
    return (
      this.fgValidador.get('raza')?.invalid &&
      (this.fgValidador.get('raza')?.dirty ||
        this.fgValidador.get('raza')?.touched)
    );
  }
  get especieNoValido() {
    return (
      this.fgValidador.get('especie')?.invalid &&
      (this.fgValidador.get('especie')?.dirty ||
        this.fgValidador.get('especie')?.touched)
    );
  }
  get estadoNoValido() {
    return (
      this.fgValidador.get('estado')?.invalid &&
      (this.fgValidador.get('estado')?.dirty ||
        this.fgValidador.get('estado')?.touched)
    );
  }
  get planIdNoValido() {
    return (
      this.fgValidador.get('planId')?.invalid &&
      (this.fgValidador.get('planId')?.dirty ||
        this.fgValidador.get('planId')?.touched)
    );
  }

  get estadoValido() {
    return this.fgValidador.get('estado')?.value;
  }
}
