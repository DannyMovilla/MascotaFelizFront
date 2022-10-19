import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'mascota-feliz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  fgValidador: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: SeguridadService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  onIngresar() {
    let usuario = this.fgValidador.controls['usuario'].value;
    let contrasena = this.fgValidador.controls['contrasena'].value;

    this.authService.almacenarSession('Hola');

    this.router.navigateByUrl('/mascotas/listar');
    this.bsModalRef?.hide();
  }
}
