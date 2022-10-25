import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prospectos } from 'src/app/modelos/prospectos.model';
import { ProspectosService } from 'src/app/services/prospectos.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoProspectosComponent } from '../info-prospectos/info-prospectos.component';

@Component({
  selector: 'mascota-feliz-listar-prospectos',
  templateUrl: './listar-prospectos.component.html',
  styleUrls: ['./listar-prospectos.component.css'],
})
export class ListarProspectosComponent implements OnInit {
  displayedColumns: string[] = ['nombres', 'mensaje', 'correo'];
  dataSource!: MatTableDataSource<Prospectos>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private prospectosServices: ProspectosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.prospectosServices.getProspectos().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('Problemas en la comunicación con el servidor');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openInfoProspectos() {
    const dialogRef = this.dialog.open(InfoProspectosComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
