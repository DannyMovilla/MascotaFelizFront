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

  getRols(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.urlMascostaFelizApi}rols`);
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

  updateRol(model: Rol): Observable<Rol> {
    return this.http.put<Rol>(
      `${environment.urlMascostaFelizApi}rols/${model.id}`,
      model,
      {}
    );
  }

  deleteRol(id: string): Observable<any> {
    return this.http.delete(`${environment.urlMascostaFelizApi}rols/${id}`, {});
  }
}
