import { Usuario } from './../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  URL_API: string = 'https://mernstackback.herokuapp.com/api/usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.URL_API);
  }

  createUsuario(data: Usuario) {
    return this.http.post(this.URL_API, data);
  }

  updateUsuario(id: string, data: Usuario) {
    return this.http.put(`${this.URL_API}/${id}`, data);
  }

  deleteUsuario(id: string) {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}
