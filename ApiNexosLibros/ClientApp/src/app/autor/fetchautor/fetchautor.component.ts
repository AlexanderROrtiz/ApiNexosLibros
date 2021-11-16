import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioAutor } from '../../services/servicioautor.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Autor } from '../../models/Autor';

@Component({
  selector: 'app-fetch-autor',
  templateUrl: './fetchautor.component.html'
})
export class FetchAutorComponent {

  autorPosts$: Observable<Autor[]>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _servicioautor: ServicioAutor, private _router: Router) {
   
  }

  ngOnInit() {
    this.loadAutorPosts();
  }

  loadAutorPosts() {
    this.autorPosts$ = this._servicioautor.get();
  }

  delete(AutorID) {
    var ans = confirm("¿Quieres eliminar el autor? " + AutorID);
    if (ans) {
      this._servicioautor.delete(AutorID).subscribe((data) => {
        this.loadAutorPosts();
      }, error => console.error(error))
    }
  }
}
