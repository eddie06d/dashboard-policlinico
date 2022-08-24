import { EspecialidadesComponent } from './especialidades.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let app: EspecialidadesComponent;
  let fixture: ComponentFixture<EspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [ EspecialidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  it('Should return an invalid create form', () => {
    const form = app.form;
    // tslint:disable-next-line: no-string-literal
    const description = form.controls['descripcion'];
    description.setValue('Descripción de ejemplo');

    expect(form.invalid).toBeTrue();
  });

  it('Should return a valid create form', () => {
    const form = app.form;
    // tslint:disable-next-line: no-string-literal
    const especialidad = form.controls['especialidad'];
    especialidad.setValue('Especialidad de ejemplo');
    // tslint:disable-next-line: no-string-literal
    const description = form.controls['descripcion'];
    description.setValue('Descripción de ejemplo');
    // tslint:disable-next-line: no-string-literal
    const imagen = form.controls['imagen'];
    imagen.setValue('Imagen de ejemplo');

    expect(form.invalid).toBeFalse();
  });

});
