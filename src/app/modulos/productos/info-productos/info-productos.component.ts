import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductoServicio } from 'src/app/modelos/producto-servicio.model';
import { ArchivosService } from 'src/app/services/archivos.service';
import { ProductoServicioService } from 'src/app/services/producto-servicio.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mascota-feliz-info-productos',
  templateUrl: './info-productos.component.html',
  styleUrls: ['./info-productos.component.css'],
})
export class InfoProductosComponent implements OnInit {
  modeloCategoria: string[] = ['PRODUCTO', 'SERVICIO'];

  idProducto?: string | undefined;
  urlFotoProducto: string | undefined;

  dataSesion: any;
  modeloMascota: ProductoServicio = new ProductoServicio();

  file!: File;

  onClose: any;

  fgValidador: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    foto: [''],
  });

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private productoServices: ProductoServicioService,
    private authServices: SeguridadService,
    private archivoServices: ArchivosService
  ) {}

  ngOnInit(): void {
    this.dataSesion = this.authServices.obtenerSession();
    this.obtenerObjecto();
  }

  obtenerObjecto() {
    if (this.idProducto != null) {
      this.productoServices.getProductoServicioById(this.idProducto).subscribe({
        next: (dataUsario) => {
          this.modeloMascota = dataUsario;
          this.fgValidador.controls['id'].setValue(this.idProducto);
          this.fgValidador.controls['nombre'].setValue(dataUsario.nombre);
          this.fgValidador.controls['tipo'].setValue(dataUsario.tipo);
          this.fgValidador.controls['descripcion'].setValue(
            dataUsario.descripcion
          );
          this.fgValidador.controls['precio'].setValue(dataUsario.precio);
          this.fgValidador.controls['foto'].setValue(dataUsario.foto);
          this.urlFotoProducto = dataUsario.foto;
        },
        error: (err) => {
          console.log('Problemas en la comunicación con el servidor');
        },
      });
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onRegistrar() {
    if (this.fgValidador.valid) {
      if (typeof this.file != 'undefined') {
        const { task, ref, path } = this.archivoServices.uploadImageToFirebase(
          this.file
        );

        task.subscribe(
          (snapshot) => {},
          (error) =>
            console.log('Some error occured while uploading the picture'),
          () =>
            ref.getDownloadURL().subscribe((downloadUrl) => {
              let productoData = new ProductoServicio(this.fgValidador.value);
              productoData.precio = String(productoData.precio);
              productoData.foto = downloadUrl;
              delete productoData.id;

              if (this.idProducto == null) {
                this.productoServices
                  .newProductoServicio(productoData)
                  .subscribe(
                    (datos: any) => {
                      Swal.fire(
                        'Mascota Feliz!',
                        'El producto fue guardado correctamente',
                        'success'
                      );

                      this.onClose();
                      this.bsModalRef?.hide();
                    },
                    (error: any) => {
                      console.log(error);

                      Swal.fire(
                        'Mascota Feliz!',
                        'Error al guardar la información',
                        'warning'
                      );
                    }
                  );
              } else {
                //mascotaData.estado = this.modeloMascota.estado;
                this.productoServices
                  .updateProductoServicio(this.idProducto, productoData)
                  .subscribe(
                    (datos: any) => {
                      Swal.fire(
                        'Mascota Feliz!',
                        'El producto fue actualizado correctamente',
                        'success'
                      );

                      this.onClose();
                      this.bsModalRef?.hide();
                    },
                    (error: any) => {
                      console.log(error);

                      Swal.fire(
                        'Mascota Feliz!',
                        'Error al actualizar la información',
                        'warning'
                      );
                    }
                  );
              }
            })
        );
      } else {
        Swal.fire(
          'Mascota Feliz!',
          'Debe seleccionar una foto del producto',
          'warning'
        );
      }
    } else {
      Swal.fire('Mascota Feliz!', 'Debe diligenciar los campos', 'warning');
    }
  }

  get nombreNoValido() {
    return (
      this.fgValidador.get('nombre')?.invalid &&
      (this.fgValidador.get('nombre')?.dirty ||
        this.fgValidador.get('nombre')?.touched)
    );
  }
  get tipoNoValido() {
    return (
      this.fgValidador.get('tipo')?.invalid &&
      (this.fgValidador.get('tipo')?.dirty ||
        this.fgValidador.get('tipo')?.touched)
    );
  }
  get descripcionNoValido() {
    return (
      this.fgValidador.get('descripcion')?.invalid &&
      (this.fgValidador.get('descripcion')?.dirty ||
        this.fgValidador.get('descripcion')?.touched)
    );
  }
  get precioNoValido() {
    return (
      this.fgValidador.get('precio')?.invalid &&
      (this.fgValidador.get('precio')?.dirty ||
        this.fgValidador.get('precio')?.touched)
    );
  }
  get fotoNoValido() {
    return (
      this.fgValidador.get('foto')?.invalid &&
      (this.fgValidador.get('foto')?.dirty ||
        this.fgValidador.get('foto')?.touched)
    );
  }
}
