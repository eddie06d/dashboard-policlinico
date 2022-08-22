import { Cita } from './../interfaces/cita.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  URL_API_PROD: string = 'https://mernstackback.herokuapp.com/api/citas';
  URL_API_DEV: string = 'http://localhost:4000/api/citas';

  constructor(private http: HttpClient) { }

  getCitas(): Observable<any> {
    return this.http.get<any>(this.URL_API_PROD);
  }

  updateCita(id: string, data: Cita) {
    return this.http.put(`${this.URL_API_PROD}/${id}`, data);
  }

  deleteCita(id: string) {
    return this.http.delete(`${this.URL_API_PROD}/${id}`);
  }
}
