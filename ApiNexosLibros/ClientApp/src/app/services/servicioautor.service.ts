import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { Autor } from '../models/Autor';



@Injectable()
export class ServicioAutor {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  get() {
    return this._http.get<Autor[]>(this.myAppUrl + 'api/Autor/Index').pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getById(id: number) {
    return this._http.get(this.myAppUrl + "api/Autor/FindById/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  save(regitro) {
    return this._http.post(this.myAppUrl + 'api/Autor/Create', regitro).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  update(id: number, autor) {
    return this._http.put<Autor>(this.myAppUrl + 'api/Autor/Edit/' + id, autor).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this._http.delete(this.myAppUrl + "api/Autor/Delete/" + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
