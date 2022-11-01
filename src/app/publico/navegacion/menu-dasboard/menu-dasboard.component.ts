import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxRolesService } from 'ngx-permissions';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'mascota-feliz-menu-dasboard',
  templateUrl: './menu-dasboard.component.html',
  styleUrls: ['./menu-dasboard.component.css'],
})
export class MenuDasboardComponent implements OnInit {
  dataUser: any;

  constructor(
    private authServices: SeguridadService,
    private router: Router,
    private rolesService: NgxRolesService
  ) {}

  ngOnInit(): void {
    this.dataUser = this.authServices.obtenerSession();
  }

  cerrarSession() {
    this.rolesService.flushRoles();
    this.authServices.eliminarSession();
    this.router.navigateByUrl('/inicio');
  }
}
