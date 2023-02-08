import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(protected http: HttpClient) {}
  registro(registro: any): Observable<any> {
    return this.http.post(
      'http://34.225.239.102/api/registrar/usuario',
      registro
    );
  }
}
