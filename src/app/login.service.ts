import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}
  id;
  login(usuario): Observable<any> {
    this.id = this.http.post('http://34.225.239.102/api/iniciar', usuario);
    console.log(this.id + '  EN ANGULAR ID');
    console.log('usuario ', usuario);
    localStorage.setItem('id', this.id);
    return this.id;
  }

  getID() {
    return localStorage.getItem('id');
  }
}
