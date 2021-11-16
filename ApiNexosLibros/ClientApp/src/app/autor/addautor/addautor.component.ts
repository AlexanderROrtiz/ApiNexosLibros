import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioAutor } from '../../services/servicioautor.service';

@Component({
  selector: 'app-add-autor',
  templateUrl: './addautor.component.html'
})

export class crearautor implements OnInit {
  autorForm: FormGroup;
  titlePage: string = "Create";
  autorId: number;
  errorMessage: any;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _servicioautor: ServicioAutor, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.autorId = this._avRoute.snapshot.params["id"];
    }

    this.autorForm = this._fb.group({
      id: 0,
      NombreCompleto: ['', [Validators.required]],
      FechaNacimiento: ['', [Validators.required]],
      CiudadProcedencia: ['', [Validators.required]],
      Correo: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    if (this.autorId > 0) {
      this.titlePage = "Edit";
      this._servicioautor.getById(this.autorId).subscribe(resp => this.autorForm.patchValue(resp), error => this.errorMessage = error);
    }
  }

  save() {

    if (!this.autorForm.valid) {
      return;
    }

    if (this.titlePage == "Create") {
      this._servicioautor.save(this.autorForm.value)
        .subscribe((data) => {
          this._router.navigate(['/autor']);
        }, error => this.errorMessage = error)
    }
    else if (this.titlePage == "Edit") {
      this._servicioautor.update(this.autorId, this.autorForm.value)
        .subscribe((data) => {
          this._router.navigate(['/autor']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/autor']);
  }

  get NombreCompleto() { return this.autorForm.get('NombreCompleto'); }
  get FechaNacimiento() { return this.autorForm.get('FechaNacimiento'); }
  get CiudadProcedencia() { return this.autorForm.get('CiudadProcedencia'); }
  get Correo() { return this.autorForm.get('Correo'); }
}
