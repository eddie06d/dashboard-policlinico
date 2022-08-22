import { CitasService } from './../../services/citas.service';
import { Cita } from './../../interfaces/cita.interface';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  title = 'Cliente REST API Citas';
  citas: Cita[] = [];
  citasFilter: Cita[] = [];
  cita?: Cita;

  constructor(
    private citaService: CitasService,
  ) {}

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.citaService.getCitas().subscribe({
      next: (res: any) => {
        this.citas = res;
        this.citasFilter = res;
      },
      error: (err) => console.log(err)
    });
  }

  search(e: any): void {
    const val = e.target.value;
    if(val.length > 0) {
      this.citasFilter = this.citas.filter(cita => cita.correo.toLowerCase().startsWith(val.toLowerCase().trim()));
    }else this.citasFilter = this.citas;
  }

  verDetalles(data: Cita): void {
    this.cita = data;
  }

  actualizarCita(data: Cita): void {
    const body = {
      ...data,
      atendido: true
    };
    this.citaService.updateCita(data._id!, body).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Operación exitosa',
          text: res.message,
          icon: 'success'
        }).then(() => {
          this.cargarData();
        });
      },
      error: (err) => console.log(err)
    });
  }

  eliminarCita(data: Cita): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar la cita del paciente con correo ${data.correo}?`,
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((res) => {
      if(res.isConfirmed) {
        this.citaService.deleteCita(data._id!)
          .subscribe({
            next: (res: any) => {
              this.cargarData();
              Swal.fire({
                title: 'Operación exitosa',
                text: res.message,
                icon: 'success'
              })
            },
            error: (err: any) => console.log(err)
          });
      }
    });
  }

}
