import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'mascota-feliz-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.document.body.style.background = '#f5f5f5';
    this.document.body.className = 'text-center';
  }

  ngOnDestroy() {
    this.document.body.style.background = '';
    this.document.body.className = '';
  }

  onIngresar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.router.navigateByUrl('/inicio');
  }

}
