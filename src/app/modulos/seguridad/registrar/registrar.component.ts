import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'mascota-feliz-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit, OnDestroy {
  constructor(private router: Router, public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  onIngresar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.router.navigateByUrl('/inicio');
  }
}
