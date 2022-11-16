import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AsesorMascotas } from '../modelos/asesor-mascotas.model';

@Injectable({
  providedIn: 'root'
})
export class AsesorMascotasService {

  constructor(private http: HttpClient) {}

  getAsesorById(idAsesor: string): Observable<AsesorMascotas[]> {
    return this.http.get<AsesorMascotas[]>(
      `${environment.urlMascostaFelizApi}mascota-asesors/asesor/${idAsesor}`
    );
  }

}
