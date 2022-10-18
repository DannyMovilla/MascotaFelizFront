import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SeguridadService } from './services/seguridad.service';
import { Subscription } from 'rxjs';

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
      .subscribe((datos: any) => {
        console.log(datos);
        if (datos != '' && datos != null) {
          this.seInicionSesion = true;
        } else {
          this.seInicionSesion = false;
        }
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
