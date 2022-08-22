import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { CitasComponent } from './pages/citas/citas.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'especialidades', component: EspecialidadesComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'usuarios', component: UsuariosComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
