import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../modelos/plan.model';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private http: HttpClient) {}

  getPlan(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.urlMascostaFelizApi}plans`);
  }

  getPlanById(id: string): Observable<Plan> {
    return this.http.get<Plan>(`${environment.urlMascostaFelizApi}plans/${id}`);
  }

  newPlan(model: Plan): Observable<Plan> {
    return this.http.post<Plan>(
      `${environment.urlMascostaFelizApi}plans`,
      model,
      {}
    );
  }

  updatePlan(idPlan: string, model: Plan): Observable<Plan> {
    return this.http.put<Plan>(
      `${environment.urlMascostaFelizApi}plans/${idPlan}`,
      model,
      {}
    );
  }

  deletePlan(id: string): Observable<any> {
    return this.http.delete(
      `${environment.urlMascostaFelizApi}plans/${id}`,
      {}
    );
  }
}
