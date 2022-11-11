import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MailData } from 'src/app/modelos/mail-data.model';
import { MailDataService } from 'src/app/services/mail-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css'],
})
export class MailComponent implements OnInit {
  onClose: any;
  to?: string | undefined;

  fgValidador: FormGroup = this.fb.group({
    to: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    text: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private mailServices: MailDataService
  ) {}

  ngOnInit(): void {
    this.fgValidador.controls['to'].setValue(this.to);
  }

  onRegistrar() {
    let mail = new MailData(this.fgValidador.value);

    this.mailServices.sendMail(mail).subscribe(
      (datos: any) => {
        Swal.fire(
          'Mascota Feliz!',
          'El envío fue envíado correctamente',
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

  get getForm() {
    return this.fgValidador.controls;
  }

  get toNoValido() {
    return (
      this.fgValidador.get('to')?.invalid &&
      (this.fgValidador.get('to')?.dirty || this.fgValidador.get('to')?.touched)
    );
  }

  get subjectNoValido() {
    return (
      this.fgValidador.get('subject')?.invalid &&
      (this.fgValidador.get('subject')?.dirty ||
        this.fgValidador.get('subject')?.touched)
    );
  }

  get textNoValido() {
    return (
      this.fgValidador.get('text')?.invalid &&
      (this.fgValidador.get('text')?.dirty ||
        this.fgValidador.get('text')?.touched)
    );
  }
}
