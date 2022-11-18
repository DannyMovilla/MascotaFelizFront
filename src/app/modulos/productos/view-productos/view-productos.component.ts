import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from 'src/app/modelos/producto-servicio.model';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';
import AOS from 'aos';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mascota-feliz-view-productos',
  templateUrl: './view-productos.component.html',
  styleUrls: ['./view-productos.component.css'],
})
export class ViewProductosComponent implements OnInit {
  modeloData: ProductoServicio[] = [];
  constructor(
    private productoServices: ProductoServicioService,
    private authServices: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authServices.obtenerSession()) {
      this.router.navigate(['/configuracion/dashboard']);
    }
    this.productoServices.getProductoServicio().subscribe({
      next: (data) => {
        this.modeloData = data;
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });

    AOS.init();
  }
}
