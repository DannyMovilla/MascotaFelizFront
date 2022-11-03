import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuRol } from 'src/app/modelos/menu-rol.model';
import { MenuRolService } from 'src/app/services/menu-rol.service';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'mascota-feliz-menu-dasboard',
  templateUrl: './menu-dasboard.component.html',
  styleUrls: ['./menu-dasboard.component.css'],
})
export class MenuDasboardComponent implements OnInit {
  dataUser: any;
  modeloData: MenuRol[] = [];

  rolUsuario: string = '';

  constructor(
    private authServices: SeguridadService,
    private menuRolServices: MenuRolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataUser = this.authServices.obtenerSession();
    this.rolUsuario = this.authServices.obtenerRolSesion();
    this.buscar();
  }

  buscar() {
    console.log(this.rolUsuario);
    this.menuRolServices.getMenuRolFilter(this.rolUsuario).subscribe({
      next: (data: MenuRol[]) => {
        console.log(data);
        this.modeloData = data;
        console.log(this.modeloData)
      },
    });
  }

  cerrarSession() {
    this.authServices.eliminarSession();
    this.router.navigateByUrl('/inicio');
  }
}
