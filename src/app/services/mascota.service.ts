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

  getMascota(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(
      `${environment.urlMascostaFelizApi}mascotas`
    );
  }

  getMascotaById(id: string): Observable<Mascota> {
    return this.http.get<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas/${id}`
    );
  }

  newMascota(model: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas`,
      model,
      {}
    );
  }

  updateMascota(model: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(
      `${environment.urlMascostaFelizApi}mascotas/${model.id}`,
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
