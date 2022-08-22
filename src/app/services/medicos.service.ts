import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  URL_API_PROD: string = 'https://mernstackback.herokuapp.com/api/medicos';

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<any> {
    return this.http.get<any>(this.URL_API_PROD);
  }

  createMedico(data: any) {
    return this.http.post(this.URL_API_PROD, data);
  }

  updateMedico(id: string, data: any) {
    return this.http.put(`${this.URL_API_PROD}/${id}`, data);
  }

  deleteMedico(id: string) {
    return this.http.delete(`${this.URL_API_PROD}/${id}`);
  }
}
