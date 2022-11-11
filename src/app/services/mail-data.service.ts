import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MailData } from '../modelos/mail-data.model';

@Injectable({
  providedIn: 'root',
})
export class MailDataService {
  constructor(private http: HttpClient) {}

  sendMail(model: MailData): Observable<any> {
    return this.http.post<MailData>(`${environment.urlMailApi}mail`, model, {});
  }
}
