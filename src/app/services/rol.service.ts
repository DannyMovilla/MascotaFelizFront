import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from '../modelos/rol.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http: HttpClient) {}

  getRols(filtroData?: Rol): Observable<Rol[]> {
    let where: any = {};

    if (filtroData?.nombre != null && filtroData?.nombre != '') {
      where['nombre'] = filtroData?.nombre;
    }

    if (filtroData?.codigo != null && filtroData?.codigo != '') {
      where['codigo'] = filtroData?.codigo;
    }

    let data = {
      where,
    };
    let filtro = JSON.stringify(data);

    return this.http.get<Rol[]>(
      `${environment.urlMascostaFelizApi}rols?filter=${filtro}`
    );
  }

  getRolById(id: string): Observable<Rol> {
    return this.http.get<Rol>(`${environment.urlMascostaFelizApi}rols/${id}`);
  }

  newRol(model: Rol): Observable<Rol> {
    return this.http.post<Rol>(
      `${environment.urlMascostaFelizApi}rols`,
      model,
      {}
    );
  }

  updateRol(idRol: string, model: Rol): Observable<Rol> {
    return this.http.put<Rol>(
      `${environment.urlMascostaFelizApi}rols/${idRol}`,
      model,
      {}
    );
  }

  deleteRol(id: string): Observable<any> {
    return this.http.delete(`${environment.urlMascostaFelizApi}rols/${id}`, {});
  }
}
