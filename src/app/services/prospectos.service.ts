import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prospectos } from '../modelos/prospectos.model';

@Injectable({
  providedIn: 'root',
})
export class ProspectosService {
  constructor(private http: HttpClient) {}

  getProspectos(): Observable<Prospectos[]> {
    return this.http.get<Prospectos[]>(
      `${environment.urlMascostaFelizApi}prospectos`
    );
  }

  getProspectosCount(): Observable<any> {
    return this.http.get<any>(
      `${environment.urlMascostaFelizApi}prospectos/count`
    );
  }

  getProspectosById(id: string): Observable<Prospectos> {
    return this.http.get<Prospectos>(`${environment.urlMascostaFelizApi}prospectos/${id}`);
  }

  newProspecto(model: Prospectos): Observable<Prospectos> {
    return this.http.post<Prospectos>(
      `${environment.urlMascostaFelizApi}prospectos`,
      model,
      {}
    );
  }
}
