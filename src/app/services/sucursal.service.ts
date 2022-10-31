import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sucursal } from '../modelos/sucursal.model';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  constructor(private http: HttpClient) {}

  getSucursal(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(
      `${environment.urlMascostaFelizApi}sucursals`
    );
  }

  getSucursalCount(): Observable<any> {
    return this.http.get<any>(
      `${environment.urlMascostaFelizApi}sucursals/count`
    );
  }

  getSucursalById(id: string): Observable<Sucursal> {
    return this.http.get<Sucursal>(
      `${environment.urlMascostaFelizApi}sucursals/${id}`
    );
  }

  newSucursal(model: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(
      `${environment.urlMascostaFelizApi}sucursals`,
      model,
      {}
    );
  }

  updateSucursal(model: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(
      `${environment.urlMascostaFelizApi}sucursals/${model.id}`,
      model,
      {}
    );
  }

  deleteSucursal(id: string): Observable<any> {
    return this.http.delete(
      `${environment.urlMascostaFelizApi}sucursals/${id}`,
      {}
    );
  }
}
