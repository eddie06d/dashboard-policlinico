import { MedicosService } from './../../services/medicos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  title = 'Cliente REST API Médicos';
  medicos: any[] = [];
  medFilter: any[] = [];
  medico?: any;
  form: FormGroup;
  formUpdate: FormGroup;
  medicoUpdate?: any;

  constructor(
    private medicoService: MedicosService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombres: ['', [ Validators.required ]],
      especialidad: ['', [ Validators.required ]],
      imagen: ['', [ Validators.required ]]
    });
    this.formUpdate = this.fb.group({
      nombresUp: ['', [ Validators.required ]],
      especialidadUp: ['', [ Validators.required ]],
      imagenUp: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.medicoService.getMedicos().subscribe({
      next: (res: any) => {
        this.medicos = res;
        this.medFilter = res;
      },
      error: (err) => console.log(err)
    });
  }

  search(e: any): void {
    const val = e.target.value;
    if(val.length > 0) {
      this.medFilter = this.medicos.filter(med => med.nombres.toLowerCase().startsWith(val.toLowerCase().trim()));
    }else this.medFilter = this.medicos;
  }

  get imagenValue() {
    return this.form.get('imagen')?.value;
  }

  get imagenValueUp() {
    return this.formUpdate.get('imagenUp')?.value;
  }

  verDetalles(data: any): void {
    this.medico = data;
  }

  actualizarMedico(data: any): void {
    this.medicoUpdate = data;
    this.formUpdate.patchValue({
      nombresUp: data.nombres,
      especialidadUp: data.especialidad,
      imagenUp: data.imagen
    });
  }

  eliminarMedico(data: any): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar al medico ${data.nombres}?`,
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((res) => {
      if(res.isConfirmed) {
        this.medicoService.deleteMedico(data._id!)
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

  onSubmit(): void {
    const data = this.form.value;
    this.medicoService.createMedico(data).subscribe({
      next: (res: any) => {
        const btnClose = document.querySelector("#btnCloseCreate") as HTMLButtonElement;
        btnClose.click();
        Swal.fire({
          title: 'Operación exitosa',
          text: res.message,
          icon: 'success'
        }).then(() => {
          this.cargarData();
          this.form.reset();
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  onSubmitUpdate(): void {
    const { especialidadUp, nombresUp, imagenUp } = this.formUpdate.value;
    const data = {
      especialidad: especialidadUp,
      nombres: nombresUp,
      imagen: imagenUp
    };
    this.medicoService.updateMedico(this.medicoUpdate?._id!, data).subscribe({
      next: (res: any) => {
        const btnClose = document.querySelector("#btnCloseUpdate") as HTMLButtonElement;
        btnClose.click();
        Swal.fire({
          title: 'Operación exitosa',
          text: res.message,
          icon: 'success'
        }).then(() => {
          this.cargarData();
          this.formUpdate.reset();
        });
      },
      error: (err: any) => console.log(err)
    });
  }
}
