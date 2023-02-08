import { Injectable, ɵConsole } from '@angular/core';
//para leer el http
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emplear } from '../app/models/empleado';
//import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  token = localStorage.getItem('token');
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token ' + this.token,
  });
  id;
  constructor(protected http: HttpClient) {}
  empleados = 'http://redesequipo.ddns.net:8080/api';

  getEmpleados() {
    this.id = this.http.get(`http://localhost:8080/api/usuario`);
    console.log(this.id + '  EN ANGULAR ID');
    localStorage.setItem('id', this.id);
    return this.id;
  }

  getId() {
    return localStorage.getItem('id');
  }

  getEmpleado(id: string): Observable<any> {
    return this.http.get(`${this.empleados}/empleado/${id}`);
  }

  saveEmpleado(nombrecitos, apellidito, telefonito, data) {
    return this.http.post(
      'http://redesequipo.ddns.net:8080/api/empleado/' +
        nombrecitos +
        '/' +
        apellidito +
        '/' +
        telefonito +
        '/',
      data
    );
  }

  deleteEmpleado(id: string) {
    return this.http.delete(`${this.empleados}/empleado/${id}`);
  }

  updateEmpleado(
    id,
    nombrecitos,
    apellidito,
    telefonito,
    data
  ): Observable<any> {
    return this.http.put(
      'http://redesequipo.ddns.net:8080/api/empleado/' +
        id +
        '/' +
        nombrecitos +
        '/' +
        apellidito +
        '/' +
        telefonito +
        '/',
      data
    );
  }
}
