import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'mascota-feliz-menu-dasboard',
  templateUrl: './menu-dasboard.component.html',
  styleUrls: ['./menu-dasboard.component.css'],
})
export class MenuDasboardComponent implements OnInit  {

  constructor(private authServices: SeguridadService) { }

  ngOnInit(): void {
  }

  cerrarSession(){
    this.authServices.eliminarSession();
  }

}
