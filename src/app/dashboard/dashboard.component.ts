import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empleado: any = [];
  constructor(
    public dashboardService: DashboardService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (this.dashboardService.getId() != null) {
      this.router.navigate(['/Dashboard']);
      this.getEmpleados();
    } else {
      this.router.navigate(['/']);
    }
  }

  getEmpleados() {
    this.dashboardService.getEmpleados().subscribe(
      (res) => {
        this.empleado = res;
      },
      (err) => console.log(err)
    );
  }

  deleteEmpleado(id: string) {
    this.dashboardService.deleteEmpleado(id).subscribe(
      (res) => {
        console.log(res);
        alert('USTED ACABA DE ELIMINAR AL EMPLEADO NUMERO: ' + id);

        this.getEmpleados();
      },
      (err) => console.log(err)
    );
  }

  cerrarSesion() {
    localStorage.removeItem('id');
  }
}
//401
