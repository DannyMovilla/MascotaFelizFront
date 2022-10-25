import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit,
  HostListener,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SeguridadService } from './services/seguridad.service';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from './modelos/modelo-identificar';

@Component({
  selector: 'mascota-feliz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'mascota-feliz';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  seInicionSesion: boolean = false;

  subs: Subscription = new Subscription();

  constructor(
    private observer: BreakpointObserver,
    private changeDetector: ChangeDetectorRef,
    private authServices: SeguridadService
  ) {}

  ngOnInit(): void {
    this.subs = this.authServices
      .obtenerDatosUserSession()
      .subscribe((datos: ModeloIdentificar) => {
        this.seInicionSesion = datos.estaIdentificado;
      });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.changeDetector.detectChanges();
  }

}
