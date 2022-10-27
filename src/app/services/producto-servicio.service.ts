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

  getProductoServicio(): Observable<ProductoServicio[]> {
    return this.http.get<ProductoServicio[]>(
      `${environment.urlMascostaFelizApi}producto-servicios`
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
    model: ProductoServicio
  ): Observable<ProductoServicio> {
    return this.http.put<ProductoServicio>(
      `${environment.urlMascostaFelizApi}producto-servicios/${model.id}`,
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
