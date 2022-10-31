import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'mascota-feliz-menu-dasboard',
  templateUrl: './menu-dasboard.component.html',
  styleUrls: ['./menu-dasboard.component.css'],
})
export class MenuDasboardComponent implements OnInit {
  dataUser: any;

  constructor(private authServices: SeguridadService, private router: Router) {}

  ngOnInit(): void {
    this.dataUser = this.authServices.obtenerSession();
  }

  cerrarSession() {
    this.authServices.eliminarSession();
    this.router.navigateByUrl('/inicio');
  }
}
