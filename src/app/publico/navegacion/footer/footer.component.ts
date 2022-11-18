import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/modulos/seguridad/login/login.component';
import { RegistrarComponent } from 'src/app/modulos/seguridad/registrar/registrar.component';

@Component({
  selector: 'mascota-feliz-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

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
