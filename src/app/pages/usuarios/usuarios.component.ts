import { UsuariosService } from './../../services/usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../../interfaces/usuario.interface';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  title = 'Cliente REST API Usuarios';
  users: Usuario[] = [];
  usersFilter: Usuario[] = [];
  user?: Usuario;
  form: FormGroup;
  formUpdate: FormGroup;
  userUpdate?: Usuario;

  constructor(
    private userService: UsuariosService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      correo: ['', [ Validators.required, Validators.email ]],
      apellidos: ['', [ Validators.required ]],
      nombres: ['', [ Validators.required ]],
      distrito: ['', [ Validators.required ]]
    });
    this.formUpdate = this.fb.group({
      correoUp: ['', [ Validators.required, Validators.email ]],
      apellidosUp: ['', [ Validators.required ]],
      nombresUp: ['', [ Validators.required ]],
      distritoUp: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.userService.getUsuarios().subscribe({
      next: (res: any) => {
        this.users = res;
        this.usersFilter = res;
      },
      error: (err) => console.log(err)
    });
  }

  search(e: any): void {
    const val = e.target.value;
    if(val.length > 0) {
      this.usersFilter = this.users.filter(user => user.correo.toLowerCase().startsWith(val.toLowerCase().trim()));
    }else this.usersFilter = this.users;
  }

  actualizarUsuario(data: Usuario): void {
    this.userUpdate = data;
    this.formUpdate.patchValue({
      correoUp: data.correo,
      nombresUp: data.nombres,
      apellidosUp: data.apellidos,
      distritoUp: data.distrito
    });
  }

  eliminarUsuario(data: Usuario): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar al usuario ${data.nombres} ${data.apellidos}?`,
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((res) => {
      if(res.isConfirmed) {
        this.userService.deleteUsuario(data._id!)
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
    this.userService.createUsuario(data).subscribe({
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
    const { correoUp, nombresUp, apellidosUp, distritoUp } = this.formUpdate.value;
    const data = {
      correo: correoUp,
      nombres: nombresUp,
      apellidos: apellidosUp,
      distrito: distritoUp
    };
    this.userService.updateUsuario(this.userUpdate?._id!, data).subscribe({
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
