import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../modelos/mascota.model';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  constructor(private http: HttpClient) {}

  getMascota(filtroMascota?: Mascota): Observable<Mascota[]> {
    let where: any = {};

    if (filtroMascota?.nombre != null && filtroMascota?.nombre != '') {
      where['nombre'] = filtroMascota?.nombre;
    }

    if (filtroMascota?.estado != null && filtroMascota?.estado != '') {
      where['estado'] = filtroMascota?.estado;
    }

    let data = {
      where,
      include: [{ relation: 'usuario' }, { relation: 'plan' }],
    };
    let filtro = JSON.stringify(data);

    return this.http.get<Mascota[]>(
      `${environment.urlMascostaFelizApi}mascotas?filter=${filtro}`
    );
  }

  getMascotaCliente(
    idCliente: string,
    filtroMascota?: Mascota
  ): Observable<Mascota[]> {
    let where: any = {usuarioId: idCliente};

    if (filtroMascota?.nombre != null && filtroMascota?.nombre != '') {
      where['nombre'] = filtroMascota?.nombre;
    }

    if (filtroMascota?.estado != null && filtroMascota?.estado != '') {
      where['estado'] = filtroMascota?.estado;
    }
    let data = {
      where,
      include: [{ relation: 'usuario' }, { relation: 'plan' }],
    };

    let filtro = JSON.stringify(data);
    return this.http.get<Mascota[]>(
      `${environment.urlMascostaFelizApi}mascotas?filter=${filtro}`
    );
  }

  getMascotaCount(): Observable<any> {
    return this.http.get<any>(
      `${environment.urlMascostaFelizApi}mascotas/count`
    );
  }

  getMascotaById(id: string): Observable<Mascota> {
    return this.http.get<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas/${id}?filter={"include":[{"relation": "usuario"},{"relation": "plan"}]}`
    );
  }

  newMascota(model: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas`,
      model,
      {}
    );
  }

  updateMascota(idMascota: string, model: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas/${idMascota}`,
      model,
      {}
    );
  }

  updatePatchMascota(idMascota: string, model: Mascota): Observable<Mascota> {
    return this.http.patch<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas/${idMascota}`,
      model,
      {}
    );
  }

  updateEstadoMascota(idMascota: string, model: Mascota): Observable<Mascota> {
    return this.http.patch<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas/estadoafiliacion/${idMascota}`,
      model,
      {}
    );
  }

  deleteMascota(id: string): Observable<any> {
    return this.http.delete(
      `${environment.urlMascostaFelizApi}mascotas/${id}`,
      {}
    );
  }
}
