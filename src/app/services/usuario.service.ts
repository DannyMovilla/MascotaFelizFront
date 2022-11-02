import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${environment.urlMascostaFelizApi}usuarios?filter={"include":[{"relation": "rol"}]}`
    );
  }

  getUsuarioCount(): Observable<any> {
    return this.http.get<any>(
      `${environment.urlMascostaFelizApi}usuarios/count`
    );
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${environment.urlMascostaFelizApi}usuarios/${id}`
    );
  }

  newUsuario(model: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${environment.urlMascostaFelizApi}usuarios`,
      model,
      {}
    );
  }

  updateUsuario(idUsuario: string, model: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${environment.urlMascostaFelizApi}usuarios/${idUsuario}`,
      model,
      {}
    );
  }

  updateUsuarioPatch(idUsuario: string, model: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(
      `${environment.urlMascostaFelizApi}usuarios/${idUsuario}`,
      model,
      {}
    );
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete<Usuario>(
      `${environment.urlMascostaFelizApi}usuarios/${id}`,
      {}
    );
  }
}
