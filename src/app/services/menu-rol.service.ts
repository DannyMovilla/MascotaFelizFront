import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuRol } from '../modelos/menu-rol.model';

@Injectable({
  providedIn: 'root',
})
export class MenuRolService {
  constructor(private http: HttpClient) {}

  getMenuRol(): Observable<MenuRol[]> {
    return this.http.get<MenuRol[]>(
      `${environment.urlMascostaFelizApi}menu-rols`
    );
  }

  getMenuRolFilter(rol: string): Observable<MenuRol[]> {
    let data = {
      where: {
        rol: rol,
      },
    };

    let filtro = JSON.stringify(data);
    return this.http.get<MenuRol[]>(
      `${environment.urlMascostaFelizApi}menu-rols?filter=${filtro}`
    );
  }

  getMenuRolById(id: string): Observable<MenuRol> {
    return this.http.get<MenuRol>(
      `${environment.urlMascostaFelizApi}menu-rols/${id}`
    );
  }

  newMenuRol(model: MenuRol): Observable<MenuRol> {
    return this.http.post<MenuRol>(
      `${environment.urlMascostaFelizApi}menu-rols`,
      model,
      {}
    );
  }

  updateMenuRol(idMenuRol: string, model: MenuRol): Observable<MenuRol> {
    return this.http.put<MenuRol>(
      `${environment.urlMascostaFelizApi}menu-rols/${idMenuRol}`,
      model,
      {}
    );
  }

  deleteMenuRol(id: string): Observable<any> {
    return this.http.delete(
      `${environment.urlMascostaFelizApi}menu-rols/${id}`,
      {}
    );
  }
}
