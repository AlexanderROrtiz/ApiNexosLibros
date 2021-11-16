import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioRegistro } from '../../services/servicioregistro.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Registro } from '../../models/Registro';

@Component({
  selector: 'app-fetch-registro',
  templateUrl: './fetchregistro.component.html'
})
export class FetchRegistroComponent {
  registroPosts$: Observable<Registro[]>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _servicioregistro: ServicioRegistro, private _router: Router) {
  }

  ngOnInit() {
    this.loadRegistroPosts();
  }

  loadRegistroPosts() {
    this.registroPosts$ = this._servicioregistro.get();
  }

  delete(registroID) {
    var ans = confirm("¿Desea eliminar el Registro? " + registroID);
    if (ans) {
      this._servicioregistro.delete(registroID).subscribe((data) => {
        this.loadRegistroPosts();
      }, error => console.error(error))
    }
  }
}


