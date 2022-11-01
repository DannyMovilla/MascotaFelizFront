import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'mascota-feliz-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {

  constructor(private authServices: SeguridadService, private router: Router) {
    if (this.authServices.obtenerSession()) {
      this.router.navigate(['/configuracion/dashboard']);
    }
  }

  ngOnInit(): void {}

}
