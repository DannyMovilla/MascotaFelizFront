import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoServicio } from '../modelos/producto-servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoServicioService {
  constructor(private http: HttpClient) {}

  getProductoServicio(
    filtroMascota?: ProductoServicio
  ): Observable<ProductoServicio[]> {
    let where: any = {};

    if (filtroMascota?.nombre != null && filtroMascota?.nombre != '') {
      where['nombre'] = filtroMascota?.nombre;
    }

    if (filtroMascota?.tipo != null && filtroMascota?.tipo != '') {
      where['tipo'] = filtroMascota?.tipo;
    }

    let data = {
      where,
    };
    let filtro = JSON.stringify(data);

    return this.http.get<ProductoServicio[]>(
      `${environment.urlMascostaFelizApi}producto-servicios?filter=${filtro}`
    );
  }

  getProductoServicioById(id: string): Observable<ProductoServicio> {
    return this.http.get<ProductoServicio>(
      `${environment.urlMascostaFelizApi}producto-servicios/${id}`
    );
  }

  newProductoServicio(model: ProductoServicio): Observable<ProductoServicio> {
    return this.http.post<ProductoServicio>(
      `${environment.urlMascostaFelizApi}producto-servicios`,
      model,
      {}
    );
  }

  updateProductoServicio(
    idProducto: string,
    model: ProductoServicio
  ): Observable<ProductoServicio> {
    return this.http.put<ProductoServicio>(
      `${environment.urlMascostaFelizApi}producto-servicios/${idProducto}`,
      model,
      {}
    );
  }

  deleteProductoServicio(id: string): Observable<any> {
    return this.http.delete(
      `${environment.urlMascostaFelizApi}producto-servicios/${id}`,
      {}
    );
  }
}
