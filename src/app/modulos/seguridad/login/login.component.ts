import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'mascota-feliz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
    'contrasena': ['', [Validators.required]]
  })

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private authService: SeguridadService
  ) {}

  ngOnInit(): void {
    this.document.body.style.background = '#f5f5f5';
    this.document.body.className = 'text-center';
  }

  ngOnDestroy() {
    this.document.body.style.background = '';
    this.document.body.className = '';
  }

  onIngresar() {
    let usuario = this.fgValidador.controls["usuario"].value;
    let contrasena = this.fgValidador.controls["contrasena"].value;

    this.authService.almacenarSession("Hola");

    this.router.navigateByUrl('/inicio');
  }
}
