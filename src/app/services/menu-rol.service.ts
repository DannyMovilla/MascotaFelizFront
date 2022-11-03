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
    console.log(rol)
    return this.http.get<MenuRol[]>(
      `${environment.urlMascostaFelizApi}menu-rols?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%22rol%22%3A%20%22${rol}%22%0A%7D%0A%7D`
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
