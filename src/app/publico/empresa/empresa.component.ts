import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Aos from 'aos';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/modulos/seguridad/login/login.component';
import { RegistrarComponent } from 'src/app/modulos/seguridad/registrar/registrar.component';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'mascota-feliz-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  bsModalRef?: BsModalRef;

  constructor(
    private authServices: SeguridadService,
    private router: Router,
    private modalService: BsModalService
  ) {
    if (this.authServices.obtenerSession()) {
      this.router.navigate(['/configuracion/dashboard']);
    }
  }

  ngOnInit(): void {
    Aos.init();
  }

  onCargarLogin() {
    let initialState = {};
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      LoginComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }

  onCargarRegistrar() {
    let initialState = {};
    let modalConfig = {
      animated: true,
    };
    /* this is how we open a Modal Component from another component */
    this.bsModalRef = this.modalService.show(
      RegistrarComponent,
      Object.assign({}, modalConfig, { class: 'modal-md', initialState })
    );
    this.bsModalRef.content.closeBtnName = 'Cancelar';
  }
}
