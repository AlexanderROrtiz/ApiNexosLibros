import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FetchLibroComponent } from '../fetchlibro/fetchlibro.component';
import { ServicioLibro } from '../../services/serviciolibro.service';
import { ServicioAutor } from '../../services/servicioautor.service';
import { ServicioRegistro } from '../../services/servicioregistro.service';

@Component({
  templateUrl: './addlibro.component.html'
})

export class crearlibro implements OnInit {
  libroForm: FormGroup;
  titlePage: string = "Create";
  libroId: number;
  errorMessage: any;
  listAutor: Array<any> = [];
  listRegistro: Array<any> = [];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _serviciolibro: ServicioLibro, private _servicioautor: ServicioAutor, private _servicioregistro: ServicioRegistro, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.libroId = this._avRoute.snapshot.params["id"];
    }

    this.libroForm = this._fb.group({
      id: 0,
      anio: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      numeroPaginas: ['', [Validators.required]],
      registroId: ['', [Validators.required]],
      autorId: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this._servicioautor.get().subscribe((data) => {
      this.listAutor = data;
    }, error => this.errorMessage = error);

    this._servicioregistro.get().subscribe((data) => {
      this.listRegistro = data;
    }, error => this.errorMessage = error);

    if (this.libroId > 0) {
      this.titlePage = "Edit";
      this._serviciolibro.getLibroById(this.libroId).subscribe(resp => this.libroForm.patchValue(resp), error => this.errorMessage = error);
    }
  }

  save() {
    if (!this.libroForm.valid) {
      return;
    }

    if (this.titlePage == "Create") {
      this._serviciolibro.saveLibro(this.libroForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-libro']);
        }, error => this.errorMessage = error)
    }
    else if (this.titlePage == "Edit") {
      this._serviciolibro.updateLibro(this.libroId, this.libroForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-libro']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/fetch-libro']);
  }

  get titulo() { return this.libroForm.get('titulo'); }
  get anio() { return this.libroForm.get('anio'); }
  get genero() { return this.libroForm.get('genero'); }
  get numeroPaginas() { return this.libroForm.get('numeroPaginas'); }
  get registroId() { return this.libroForm.get('registroId'); }
  get autorId() { return this.libroForm.get('autorId'); }
}
