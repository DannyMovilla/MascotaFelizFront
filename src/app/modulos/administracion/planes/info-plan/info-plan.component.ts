import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Plan } from 'src/app/modelos/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-plan',
  templateUrl: './info-plan.component.html',
  styleUrls: ['./info-plan.component.css'],
})
export class InfoPlanComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private planServices: PlanService,
    public dialogRef: MatDialogRef<InfoPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    if (this.data != null) {
      this.obtenerObjecto();
    }
  }

  obtenerObjecto() {
    this.planServices.getPlanById(this.data).subscribe({
      next: (data) => {
        this.fgValidador.controls['id'].setValue(this.data);
        this.fgValidador.controls['nombre'].setValue(data.nombre);
        this.fgValidador.controls['descripcion'].setValue(data.descripcion);
        this.fgValidador.controls['precio'].setValue(data.precio);
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }

  onRegistrar() {
    let planData = new Plan(this.fgValidador.value);

    if (this.data == null) {
      delete planData.id;
      this.planServices.newPlan(planData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El plan fue guardado correctamente',
            'success'
          );

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
      this.planServices.updatePlan(planData).subscribe(
        (datos: any) => {
          Swal.fire(
            'Mascota Feliz!',
            'El plan fue guardado correctamente',
            'success'
          );

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
    }
  }

  get nombreNoValido() {
    return (
      this.fgValidador.get('nombre')?.invalid &&
      (this.fgValidador.get('nombre')?.dirty ||
        this.fgValidador.get('nombre')?.touched)
    );
  }

  get descripcionNoValido() {
    return (
      this.fgValidador.get('descripcion')?.invalid &&
      (this.fgValidador.get('descripcion')?.dirty ||
        this.fgValidador.get('descripcion')?.touched)
    );
  }

  get precioNoValido() {
    return (
      this.fgValidador.get('precio')?.invalid &&
      (this.fgValidador.get('precio')?.dirty ||
        this.fgValidador.get('precio')?.touched)
    );
  }
}
