import { Component, OnInit } from '@angular/core';
import { Emplear } from '../models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-form-empleados',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css'],
})
export class FormEmpleadosComponent implements OnInit {
  empleados: Emplear = {
    id: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    imagen: '',
    created_at: new Date(),
  };
  id;
  nombre = '';
  apellido = '';
  telefono = '';
  imagenes;
  edit: boolean = false;

  constructor(
    private DashboardService: DashboardService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.DashboardService.getEmpleado(params.id).subscribe(
        (res) => {
          this.id = params.id;
          console.log('AQUI ABAJO IMPRIMO NOMBRE');
          this.empleados = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imagenes = file;
      console.log(this.imagenes);
    } else {
      this.imagenes = undefined;
    }
  }

  salvarEmpleado() {
    const data = new FormData();
    data.append('imagen', this.imagenes);
    const nombrecito = this.nombre;
    const apellidito = this.apellido;
    const telefonito = this.telefono;

    if (
      nombrecito.length == 0 ||
      apellidito.length == 0 ||
      telefonito.length == 0
    ) {
      alert('DATOS VACIOS POR FAVOR LLENE LOS DATOS');
    } else {
      //  if (data.get('imagen').length == 9) {
      //     console.log(data.get('imagen').length + 'ESTE ES EL LEGNT');
      //     alert('NO SUBIO IMAGEN SE GUARDARA CON UNA IMAGEN POR DEFECTO');
      //   }
      this.DashboardService.saveEmpleado(
        nombrecito,
        apellidito,
        telefonito,
        data
      ).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/Dashboard']);
          alert('DATOS GUARDADOS');
        },
        (err) => console.log(err)
      );
    }
  }

  updateEmpleado() {
    const data = new FormData();
    data.append('imagen', this.imagenes);
    const nombrecito = this.nombre;
    const apellidito = this.apellido;
    const telefonito = this.telefono;
    delete this.empleados.created_at;
    if (
      nombrecito.length == 0 ||
      apellidito.length == 0 ||
      telefonito.length == 0
    ) {
      alert('DATOS VACIOS POR FAVOR LLENE LOS DATOS');
    } else {
      //  if (data.get('imagen').length == 9) {
      //   console.log(data.get('imagen').length + 'ESTE ES EL LEGNT');
      //   alert('NO SUBIO IMAGEN SE GUARDARA CON UNA IMAGEN POR DEFECTO');
      // }
      this.DashboardService.updateEmpleado(
        this.id,
        nombrecito,
        apellidito,
        telefonito,
        data
      ).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/Dashboard']);
          alert('DATOS GUARDADOS');
        },
        (err) => console.error(err)
      );
    }
  }
}
