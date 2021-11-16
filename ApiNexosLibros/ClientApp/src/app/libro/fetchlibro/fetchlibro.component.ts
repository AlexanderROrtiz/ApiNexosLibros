import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioLibro } from '../../services/serviciolibro.service'
import { Libro } from '../../models/Libro';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './fetchlibro.component.html'
})

export class FetchLibroComponent {
  
  libroPosts$: Observable<Libro[]>;

  constructor(public http: HttpClient, private _router: Router, private _serviciolibro: ServicioLibro, @Inject('BASE_URL') baseUrl: string) {
    
  }

  ngOnInit() {
    this.loadLibroPosts();
  }

  loadLibroPosts() {
    this.libroPosts$ = this._serviciolibro.get();
  }

  delete(libroID) {
    var answer = confirm("¿Quieres eliminar el libro? " + libroID);
    console.log(answer)
    if (answer) {
      this._serviciolibro.deleteLibro(libroID).subscribe((data) => {
        this.loadLibroPosts();
      }, error => console.error(error))
    }
  }
}

