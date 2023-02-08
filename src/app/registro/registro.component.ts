import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registro.service';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  nombre: string;
  email: string;
  password: string;
  username: string;
  constructor(
    protected registroService: RegistroService,
    public router: Router,
    public dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    if (this.dashboardService.getId() != null) {
      this.router.navigate(['/Dashboard']);
    }
  }
  registro() {
    const registro = {
      nombre: this.nombre,
      correo: this.email,
      contrasenia: this.password,
      usuario: this.username,
    };
    if (registro != null) {
      console.log(
        registro.correo +
          ' ESTO ES USERNAME: ' +
          registro.usuario +
          ' ESTO PASSWORD: ' +
          registro.contrasenia
      );
      this.registroService.registro(registro).subscribe((data) => {
        console.log(data);
        alert('REGISTRO EXITOSO BIENVENIDO');
        this.router.navigate(['']);
      });
    }
  }
}
