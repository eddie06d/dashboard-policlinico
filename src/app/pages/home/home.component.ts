import { MedicosService } from './../../services/medicos.service';
import { UsuariosService } from './../../services/usuarios.service';
import { CitasService } from './../../services/citas.service';
import { Component, OnInit } from '@angular/core';
import { getCitasBySpecialty } from './../../data/getCitasBySpecialty';
import { getCitasByState } from './../../data/getCitasByState';
import { getDoctorsBySpecialty } from './../../data/getDoctorsBySpecialty';
import { getUsersByDistrict } from './../../data/getUsersByDistrict';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataCitasByState!: any[];
  dataCitasBySpecialty!: any[];
  data!: any[];
  dataUsers!: any[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  // options
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Especialidad';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad citas';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28'],
  };

  constructor(
    private citasSvc: CitasService,
    private usersSvc: UsuariosService,
    private medicosSvc: MedicosService
  ) { }

  ngOnInit(): void {
    this.citasSvc.getCitas().subscribe({
      next: (res: any) => {
        this.dataCitasByState = getCitasByState(res);
        this.dataCitasBySpecialty = getCitasBySpecialty(res);
      },
      error: (err) => console.log(err)
    });
    this.medicosSvc.getMedicos().subscribe({
      next: (res: any) => {
        this.data = getDoctorsBySpecialty(res);
      },
      error: (err) => console.log(err)
    });
    this.usersSvc.getUsuarios().subscribe({
      next: (res: any) => {
        this.dataUsers = getUsersByDistrict(res);
      },
      error: (err) => console.log(err)
    });
  }

  onSelectVerticalChart(event: any) {
    console.log(event);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
