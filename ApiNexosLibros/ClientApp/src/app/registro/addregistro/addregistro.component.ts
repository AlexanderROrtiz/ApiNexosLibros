import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchRegistroComponent } from '../fetchregistro/fetchregistro.component';
import { ServicioRegistro } from '../../services/servicioregistro.service';

@Component({
  selector: 'app-add-registro',
  templateUrl: './addregistro.component.html'
})

export class crearregistro implements OnInit {
  registroForm: FormGroup;
  titlePage: string = "Create";
  RegistroId: number;
  errorMessage: any;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _servicioregistro: ServicioRegistro, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.RegistroId = this._avRoute.snapshot.params["id"];
    }

    this.registroForm = this._fb.group({
      id: 0,
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      librosMaximosRegistrados: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    if (this.RegistroId > 0) {
      this.titlePage = "Edit";
      this._servicioregistro.getById(this.RegistroId).subscribe(resp => this.registroForm.patchValue(resp), error => this.errorMessage = error);
    }
  }

  save() {

    if (!this.registroForm.valid) {
      return;
    }

    if (this.titlePage == "Create") {
      this._servicioregistro.save(this.registroForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-registro']);
        }, error => this.errorMessage = error)
    }
    else if (this.titlePage == "Edit") {
      this._servicioregistro.update(this.RegistroId, this.registroForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-registro']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this._router.navigate(['/fetch-registro']);
  }

  get nombre() { return this.registroForm.get('nombre'); }
  get direccion() { return this.registroForm.get('direccion'); }
  get telefono() { return this.registroForm.get('telefono'); }
  get correo() { return this.registroForm.get('correo'); }
  get librosMaximosRegistrados() { return this.registroForm.get('librosMaximosRegistrados'); }
}
