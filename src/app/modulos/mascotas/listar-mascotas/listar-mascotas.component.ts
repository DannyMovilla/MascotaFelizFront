import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/modelos/mascota.model';
import { MascotaService } from 'src/app/services/mascota.service';
import Swal from 'sweetalert2';
import { InfoMascotaComponent } from '../info-mascota/info-mascota.component';

@Component({
  selector: 'mascota-feliz-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrls: ['./listar-mascotas.component.css'],
})
export class ListarMascotasComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nombre', 'especie', 'estado', 'opcions'];
  dataSource!: MatTableDataSource<Mascota>;
  selection = new SelectionModel<Mascota>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private mascotaServices: MascotaService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.onCargarInformacion();
  }

  onCargarInformacion() {
    this.mascotaServices.getMascota().subscribe({
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

  openRegistrar() {
    const dialogRef = this.dialog.open(InfoMascotaComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.onCargarInformacion();
    });
  }

  openUpdate(idData: String) {
    const dialogRef = this.dialog.open(InfoMascotaComponent, {
      data: idData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onCargarInformacion();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Mascota): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row}`;
  }

  onEliminar() {
    if (this.selection.selected.length > 0) {
      Swal.fire({
        title: 'Atención',
        text: 'Está seguro que desea eliminar la información seleccionada?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          for (let index = 0; index < this.selection.selected.length; index++) {
            const rolData = this.selection.selected[index];
            this.mascotaServices.deleteMascota(rolData.id!).subscribe(
              (datos: any) => {
                Swal.fire(
                  'Mascota Feliz!',
                  'La información ha sido eliminada correctamente.',
                  'success'
                );

                this.onCargarInformacion();
              },
              (error: any) => {
                console.log(error);

                Swal.fire(
                  'Mascota Feliz!',
                  'Error al eliminar la información',
                  'warning'
                );
              }
            );
          }
        }
      });
    } else {
      Swal.fire(
        'Mascota Feliz',
        'Para eliminar debe seleccionar uno o varios registros.',
        'warning'
      );
    }
  }
}
