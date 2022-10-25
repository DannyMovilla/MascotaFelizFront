import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'mascota-feliz-princial-dashboard',
  templateUrl: './princial-dashboard.component.html',
  styleUrls: ['./princial-dashboard.component.css']
})
export class PrincialDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Usuarios', cols: 1, rows: 1 },
          { title: 'Clientes', cols: 1, rows: 1 },
          { title: 'Afiliaciones', cols: 1, rows: 1 },
          { title: 'Mascotas', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Usuarios', cols: 2, rows: 1 },
        { title: 'Clientes', cols: 1, rows: 1 },
        { title: 'Afiliaciones', cols: 1, rows: 2 },
        { title: 'Mascotas', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
