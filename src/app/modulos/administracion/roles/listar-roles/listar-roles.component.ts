import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { InfoRolesComponent } from '../info-roles/info-roles.component';

@Component({
  selector: 'mascota-feliz-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css'],
})
export class ListarRolesComponent implements OnInit {
  displayedColumns: string[] = ['select', 'codigo', 'nombre', 'opcions'];
  dataSource!: MatTableDataSource<Rol>;
  selection = new SelectionModel<Rol>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rolServices: RolService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.onCargarInformacion();
  }

  onCargarInformacion() {
    this.rolServices.getRols().subscribe({
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
    const dialogRef = this.dialog.open(InfoRolesComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.onCargarInformacion();
    });
  }

  openUpdate(idData: String) {
    const dialogRef = this.dialog.open(InfoRolesComponent, {
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

  checkboxLabel(row?: Rol): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row}`;
  }

  onEliminar() {
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
          this.rolServices.deleteRol(rolData.id!).subscribe(
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
  }
}
